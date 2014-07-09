<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class V_invoice_model extends Base_model
{
	public $_table = 'v_invoice';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		$this->load->model('invoice_model', 'invoice');
    }

	public function LoadByOrderId($orderId){
		$inv = $this->invoice->LoadByOrderId($orderId);
		return $this->get($inv->id);
	}

}