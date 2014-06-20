<?php

Class Order_item_model extends Base_model
{
	public $_table = 'tbl_order_item';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->after_get, 'after_get_setDefault');

		array_push($this->before_create, 'before_get_price');
		array_push($this->before_update, 'before_get_price');

		// calculate price
		array_push($this->after_create, 'after_create_calculate');
		array_push($this->after_update, 'after_update_calculate');
    }

	public function after_get_setDefault($o){
		if(is_null($o->stitching_type))
			$o->stitching_type = 2;

		if(is_null($o->part_collar_type))
			$o->part_collar_type = 1;
		if(is_null($o->part_collar_thickness))
			$o->part_collar_thickness = 'หนานุ่มแข็ง 2 ชั้น';
		if(is_null($o->part_collar_stay))
			$o->part_collar_stay = 1;

		if(is_null($o->part_cuff_type))
			$o->part_cuff_type = 1;
		if(is_null($o->part_cuff_thickness))
			$o->part_cuff_thickness = 'หนานุ่มแข็ง 3 ชั้น';

		if(is_null($o->inventory_package_id))
			$o->inventory_package_id = 'P1';

		return $o;
	}

	public function before_get_price($o){
		if(!empty($o['fabric_body_id'])){
			$this->load->model('v_fabric_model','v_fabric');
			$f = $this->v_fabric->get($o['fabric_body_id']);
			if(!empty($f)){
				$o['item_price'] = $f->price;
			}
		}

		return $o;
	}

	private function calculate_total($order_item_id, $order_id=0){
		if(!empty($order_item_id) || !empty($order_id)){
			$sql = "
SELECT
oi.order_id,
SUM(item_price * item_amount) AS item_total
FROM ".$this->_table." oi
WHERE order_id=";
			$sql_params = array();
			if(!empty($order_id)){
				$sql .= "?";
				$sql_params = array($order_id);
			}else if(!empty($order_item_id)){
				$sql .= "(SELECT oi2.order_id FROM ".$this->_table." oi2 WHERE oi2.id=?)";
				$sql_params = array($order_item_id);
			}

			$q = $this->_database->query($sql, $sql_params);
			if($q->num_rows()>0){
				$r = $q->first_row();

				// now we get order_id
				$order_id = $r->order_id;
				$item_total = !empty($r->item_total)?$r->item_total:0;

				$this->load->model('order_model','order');
				$this->order->_database->set('total', '('.$item_total.'+IFNULL(delivery_cost, 0))', false);
				$this->order->update($order_id, array(
					'net'=>$item_total
				));
			}
		}
	}

	public function after_create_calculate($o){
		// after create model will return insert_id
		$this->calculate_total($o);

		return $o;
	}

	public function after_update_calculate($o){
		// after create model will return array($data, $result)
		$order_item_id = $o[0][$this->primary_key];
		$this->calculate_total($order_item_id);

		return $o;
	}

    /**
     * Override delete_many for calculate total
     */
    public function delete_many($primary_values)
    {
        $primary_values = $this->trigger('before_delete', $primary_values);

		// get order_id before remove order_item (first only)
		$order_id = 0;
		if(!empty($primary_values)){
			$order_item_id = $primary_values[0];
			$this->_database->select('id,order_id');
			$oi = $this->get($order_item_id);
			$order_id = $oi->order_id;
		}
		// end

        $this->_database->where_in($this->primary_key, $primary_values);

        if ($this->soft_delete)
        {
            $result = $this->_database->update($this->_table, array( $this->soft_delete_key => TRUE ));
        }
        else
        {
            $result = $this->_database->delete($this->_table);
        }

        $this->trigger('after_delete', $result);

		// call calculate
		if(!empty($order_id))
			$this->calculate_total(0, $order_id);

        return $result;
    }

}