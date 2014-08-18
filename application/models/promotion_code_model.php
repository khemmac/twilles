<?php

Class Promotion_code_model extends Base_model
{
	public $_table = 'tbl_promotion_code';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->before_create, 'before_create_get_code');

		//array_push($this->before_update, 'before_update_check_Key');
    }

	public function before_create_get_code($o){
		$o['id'] = $this->getCode();

		return $o;
	}

	private function genCode(){
		$len = 10;
		$chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$res = "";
		for ($i = 0; $i < $len; $i++) {
		    $res .= $chars[mt_rand(0, strlen($chars)-1)];
		}
		return $res;
	}

	private function getCode(){
		$code = $this->genCode();
		$o = $this->get($code);
		if(!empty($o)){
			return $this->genCode();
		}else
			return $code;
	}
/*
	protected function _Filter($o){
		if(!empty($o->inventory_type))
			$this->_database->where('inventory_type', $o->inventory_type);
	}
*/
}