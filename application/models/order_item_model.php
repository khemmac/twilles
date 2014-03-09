<?php

Class Order_item_model extends Base_model
{
	public $_table = 'tbl_order_item';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->before_create, 'before_get_price');
		array_push($this->before_update, 'before_get_price');

		array_push($this->after_create, 'after_change_calculate');
		array_push($this->after_update, 'after_change_calculate');
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

	public function after_change_calculate($o){
		if(!empty($o)){
			$order_id = $o[0]['order_id'];
			$sql = "
SELECT
SUM(item_price * item_amount) AS item_total,
SUM(item_price * item_amount) * 7 / 100 AS item_vat
FROM tbl_order_item oi
WHERE order_id=?
			";

			$q = $this->_database->query($sql, array(
				$order_id
			));
			$r = $q->first_row();

			$this->load->model('order_model','order');
			$this->order->_database->set('total', '('.$r->item_total.'+'.$r->item_vat.'+IFNULL(delivery_cost, 0))', false);
			$this->order->update($order_id, array(
				'net'=>$r->item_total,
				'vat'=>$r->item_vat
			));
			//echo $this->order->_database->last_query();
		}
		return $o;
	}

}