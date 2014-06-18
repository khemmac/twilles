<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Order extends CI_Controller {


	function __construct(){
		parent::__construct();

		$this->load->model('order_model', 'order');
	}

	public function ChangeStatus(){

	}

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

}