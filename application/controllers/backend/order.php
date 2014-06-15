<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Order extends CI_Controller {


	function __construct(){
		parent::__construct();

		$this->load->model('order_status_history_model', 'order_status_history');
		$this->load->model('order_payment_status_history_model', 'order_payment_status_history');
	}

	public function ChangeStatus(){

	}

	public function ChangePaymentStatus(){

	}

}