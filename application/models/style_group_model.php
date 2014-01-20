<?php

Class Style_group_model extends Base_model
{
	public $_table = 'tbl_style_group';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->before_create, 'before_func_remove_field');

		array_push($this->before_update, 'before_func_remove_field');

    }

	public function before_func_remove_field($o){
		unset($o['fabric_ids']);
		return $o;
	}

	public $validate = array(
		array(
			'field'		=> 'name',
			'label'		=> 'Name',
			'rules'		=> 'trim|required|callback_check_unique_name'
		),
		array(
			'field'		=> 'fabric_ids',
			'label'		=> 'Fabric',
			'rules'		=> 'trim|required|callback_check_json'
		));

}