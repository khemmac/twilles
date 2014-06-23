<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class V_invoice_item_model extends Base_model
{
	public $_table = 'v_invoice_item';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();
    }

	protected function _Filter($o){
		if(!empty($o->invoice_id))
			$this->_database->where('invoice_id', $o->invoice_id);
	}

}