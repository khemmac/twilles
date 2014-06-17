<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Part_style extends dao {

	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');

		$this->load->library('PHPExcel');

		$this->load->model('part_style_model', 'part_style');
	}

	public function index()
	{
		echo 'Icode controller';
	}

	// call back method for validation
	public function check_key($code){
		$type = 'part_style';
		$id = X::Request('id');
		$code = X::Request('code');
		$partType = X::Request('part_type');

		$pk = $this->{$type}->primary_key;

		$w = array();

		$cnt = 0;

		// case update
		if(!empty($id)){

			$w['code'] = $code;
			$w[$pk.' !='] = $id;

		} else { // case insert
			$w['code'] = $code;
		}
		$w['part_type'] = $partType;

		$cnt = $this->{$type}->count_by($w);

		//echo $this->{$type}->_database->last_query();

		if($cnt>0){
			$this->form_validation->set_message('check_key', '%s "'.$code.'" is exist please use another.');
			return FALSE;
		}else
			return TRUE;
	}

}