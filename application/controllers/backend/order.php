<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Order extends dao {//CI_Controller {


	function __construct(){
		parent::__construct();

		$this->load->model('order_model', 'order');
	}

	public function ChangeStatus(){

	}

	// **** PAYMENT STATUS
	public function PaymentStatusPending(){
		$id = X::Request('id');
		$res = $this->order->ChangePaymentStatus($id, $this->order->PAYMENT_STATUS_PENDING);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}

	public function PaymentStatusPaid(){
		$id = X::Request('id');
		$res = $this->order->ChangePaymentStatus($id, $this->order->PAYMENT_STATUS_PAID);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}

	// **** ORDER STATUS
	public function OrderStatusPendingFabric(){
		$id = X::Request('id');
		$res = $this->order->ChangeOrderStatus($id, $this->order->STATUS_PENDING_FABRIC);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}
	public function OrderStatusPendingTailor(){
		$id = X::Request('id');
		$res = $this->order->ChangeOrderStatus($id, $this->order->STATUS_PENDING_TAILOR);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}
	public function OrderStatusDelivery(){
		$id = X::Request('id');
		$res = $this->order->ChangeOrderStatus($id, $this->order->STATUS_DELIVERY);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}
	public function OrderStatusCompleted(){
		$id = X::Request('id');
		$res = $this->order->ChangeOrderStatus($id, $this->order->STATUS_COMPLETE);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}
	public function OrderStatusCancelled(){
		$id = X::Request('id');
		$res = $this->order->ChangeOrderStatus($id, $this->order->STATUS_CANCEL);
		X::renderJSON(array(
			'success'=>true,
			'data'=>$res
		));
	}

	// call back method for validation
	public function check_promotion_code($code){
		if(empty($code))
			return TRUE;

		$id = X::Request('id');
		$this->load->model('v_promotion_code_model', 'v_promotion_code');

		$w = array();

		$cnt = 0;

		$w['id'] = $code;

		$strWhere = "
		IF(never_expire=0, (NOW() BETWEEN promotion_valid_date AND promotion_expire_date),TRUE)
		AND (order_id IS NULL";
		if(isset($id)){
			$strWhere .= ' OR order_id ='.intval($id);
		}
		$strWhere .= ')';
		$this->v_promotion_code->_database->where($strWhere, null, false);

		$cnt = $this->v_promotion_code->count_by($w);

		//echo $this->v_promotion_code->_database->last_query();
		//echo $cnt;

		if($cnt==1){
			return TRUE;
		}else{
			$this->form_validation->set_message('check_promotion_code', '%s "'.$code.'" is not a valid promotion code.');
			return FALSE;
		}
	}

}