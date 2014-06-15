<?php

Class V_order_payment_status_history_model extends Base_model
{
	public $_table = 'v_order_payment_status_history';

	public $primary_key = 'id';

	protected function _Filter($o){
		if(!empty($o->order_id))
			$this->_database->where('order_id', $o->order_id);
	}

}