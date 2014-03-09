<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Icode extends dao {//CI_Controller {

	public function index()
	{
		echo 'Icode controller';
	}

	// call back method for validation
	public function check_key($code){
		$type = X::Request('type');
		$id = X::Request('id');
		$code = X::Request('code');
		$this->load->model($type.'_model', $type);

		$pk = $this->{$type}->primary_key;

		$w = array();

		$cnt = 0;

		// case update
		if(!empty($id)){

			$w[$pk] = $code;
			$w[$pk.' !='] = $id;

		} else { // case insert
			$w[$pk] = $code;
		}

		$cnt = $this->{$type}->count_by($w);

		//echo $this->{$type}->_database->last_query();

		if($cnt>0){
			$this->form_validation->set_message('check_key', '%s "'.$code.'" is exist please use another.');
			return FALSE;
		}else
			return TRUE;
	}

}