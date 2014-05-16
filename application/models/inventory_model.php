<?php

Class Inventory_model extends Base_model
{
	public $_table = 'tbl_inventory';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();


		array_push($this->after_get, 'after_get_mapping');

		array_push($this->before_create, 'before_create_check_Key');

		array_push($this->before_update, 'before_update_check_Key');
    }

	public function after_get_mapping($o){
		$o->code = $o->id;
		return $o;
	}

	public function before_create_check_Key($o){
		if(empty($o['code'])) return $o;

		$o['id'] = $o['code'];
		unset($o['code']);
		return $o;
	}

	public function before_update_check_Key($o){
		if(empty($o['code'])) return $o;

		$o['id'] = $o['code'];
		unset($o['code']);
		return $o;
	}

	protected $validate = array(
		array(
			'field'		=> 'code',
			'label'		=> 'Code',
			'rules'		=> 'trim|required|callback_check_key'
		)
	);

	protected function _Filter($o){
		if(!empty($o->inventory_type))
			$this->_database->where('inventory_type', $o->inventory_type);
	}

}