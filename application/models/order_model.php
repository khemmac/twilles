<?php

Class Order_model extends Base_model
{
	public $_table = 'tbl_order';

	public $primary_key = 'id';

	protected $soft_delete = TRUE;

	public $PAYMENT_STATUS_PENDING = 1;
	public $PAYMENT_STATUS_PAID = 2;

	public $STATUS_PENDING_FABRIC = 1;
	public $STATUS_DELIVERY = 2;
	public $STATUS_COMPLETE = 3;
	public $STATUS_CANCEL = 4;

	public function __construct()
    {
        parent::__construct();

		$this->load->model('order_status_history_model', 'order_status_history');
		$this->load->model('order_payment_status_history_model', 'order_payment_status_history');

		array_push($this->before_create, 'before_create_generate_code');

		array_push($this->before_create, 'before_save_calculate_total');
		array_push($this->before_update, 'before_save_calculate_total');

		// after delete
		//array_push($this->after_delete, 'afterDeleteRemoveItem');
    }

	public function before_create_generate_code($o){
		$sql = "
SELECT
CONCAT(
	DATE_FORMAT(?, '%y%m'), -- Year and Year
	LPAD(?, 5, '0'), -- MEMBER ID
	(SELECT COUNT(id)+1 FROM tbl_order WHERE member_id=?
		AND DATE_FORMAT(order_date, '%y%m')=DATE_FORMAT(?, '%y%m')
	) -- Running number (use id of tbl_order + 1)
) AS order_code
		";

		$q = $this->_database->query($sql, array(
			$o['order_date'], $o['member_id'],
			$o['member_id'], $o['order_date']
		));
		$r = $q->first_row();

		$o['order_code'] = $r->order_code;

		return $o;
	}

	public function before_save_calculate_total($o){
		if(!empty($o['id'])){
			// load total from db
			$this->load->model('order_model','order');
			$order_result = $this->order->get($o['id']);

			$net = $order_result->net;
			$delivery_cost = floatval($o['delivery_cost']);

			$discount = 0;

			// load discount from db
			if(!empty($order_result->promotion_code)){
				$this->load->model('promotion_code_model','promotion_code');
				$pcObj = $this->promotion_code->get($order_result->promotion_code);
				if(!empty($pcObj)){
					if($pcObj->promotion_type==2){
						$discount = $net * floatval($pcObj->promotion_amount) / 100.0;
					}else{
						$discount = $pcObj->promotion_amount;
					}
				}
			}

			$o['discount'] = $discount;
			$o['total'] = $net + $delivery_cost - $discount;
		}
		return $o;
	}

	public function afterDeleteRemoveItem($deleteResult){
		//echo $deleteResult;
		$affecteds = $this->db->affected_rows();
		echo '$$$$$$$$$$$$'.PHP_EOL;
		print_r($affecteds);
	}

	public function ChangePaymentStatus($id, $status){
		$res = $this->update($id, array(
			'payment_status'=>$status
		));
		// add history
		$this->order_payment_status_history->InsertHistory($id, $status);
		return $res;
	}

	public function ChangeOrderStatus($id, $status){
		$res = $this->update($id, array(
			'status'=>$status
		));
		// add history
		$this->order_status_history->InsertHistory($id, $status);
		return $res;
	}

	protected $validate = array(
		array(
			'field'		=> 'promotion_code',
			'label'		=> 'Promotion code',
			'rules'		=> 'trim|callback_check_promotion_code'
		)
	);

}