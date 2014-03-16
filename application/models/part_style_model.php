<?php

Class Part_style_model extends Base_model
{
	public $_table = 'tbl_part_style';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();


		//array_push($this->after_get, 'after_get_mapping');

    }
/*
	public function after_get_mapping($o){
		$o->code = $o->id;
		return $o;
	}
*/

	protected $validate = array(
		array(
			'field'		=> 'code',
			'label'		=> 'Code',
			'rules'		=> 'trim|required|callback_check_key'
		),
		array(
			'field'		=> 'part_type',
			'label'		=> 'Part type',
			'rules'		=> 'trim|required'
		)
	);

	protected function _Filter($o){
		if(!empty($o->part_type))
			$this->_database->where('part_type', $o->part_type);
	}

}