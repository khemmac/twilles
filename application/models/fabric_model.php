<?php

Class Fabric_model extends Base_model
{
	public $_table = 'tbl_fabric';

	public $primary_key = 'id';

	protected $soft_delete = TRUE;
    protected $soft_delete_key = 'is_active';
	protected $_temporary_only_deleted = TRUE;

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

	// FOR PRIORITY
	public $tree_fields = 'id,name';
	public function populate_tree($list){
		foreach($list AS $o){
			$o->text = $o->id.' - '.$o->name;
		}
		return $list;
	}

}