<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class V_order_item_model extends Base_model
{
	public $_table = 'v_order_item';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();
    }

	protected function _Filter($o){
		if(!empty($o->order_id))
			$this->_database->where('order_id', $o->order_id);
	}

}