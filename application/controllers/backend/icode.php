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
		$this->load->model($type.'_model', $type);

		$pk = $this->{$type}->primary_key;

		$w = array(
			$pk => $code
		);

		$cnt = 0;
		if(!empty($id))
			$w[$pk.' !='] = $id;

		$cnt = $this->{$type}->count_by($w);

		if($cnt>0){
			$this->form_validation->set_message('check_key', '%s "'.$code.'" is exist please use another.');
			return FALSE;
		}else
			return TRUE;
	}

}