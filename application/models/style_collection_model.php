<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class Style_collection_model extends Base_model
{
	public $_table = 'tbl_style_collection';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

    }

	protected function _Filter($o){
		if(!empty($o->style_type))
			$this->_database->where('style_type', $o->style_type);
	}

	protected $validate = array(
		array(
			'field'		=> 'code',
			'label'		=> 'Code',
			'rules'		=> 'trim|required|callback_check_duplicate_code'
		)
	);

}