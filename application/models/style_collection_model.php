<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class Style_collection_model extends Base_model
{
	public $_table = 'tbl_style_collection';

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
		$o['id'] = $o['code'];
		unset($o['code']);
		return $o;
	}

	public function before_update_check_Key($o){
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
		if(!empty($o->style_type))
			$this->_database->where('style_type', $o->style_type);
	}

}