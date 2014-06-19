<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Order extends CI_Controller {


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

}