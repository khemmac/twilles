<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class dao extends CI_Controller {

	function __construct(){
		parent::__construct();

		$this->load->library('form_validation');

		// check logged in
		if(false){//if (!$this->ion_auth->logged_in() || !$this->ion_auth->is_admin()){
			X::renderJSON(array(
				'success'=>false,
				'errors'=>(object)array(),
				'message'=>'Session is expired. please login again.'
			));
			exit();
		}
	}

	public function index()
	{
		echo 'dao controller';
	}

	public function _VoidMapping($o){
		return (object)array();
	}

	public function _ObjectMapping($o){
		return (object)array();
	}

	public function _ArrayMapping($list){
		$result = array();
		foreach ($list as $value){
			array_push($result,$value->export());
		}
		return $result;
	}


	protected function validate($data, $rules){
		foreach($data as $key => $val)
		{
			$_POST[$key] = $val;
		}

		$this->load->library('form_validation');
		$this->form_validation->set_rules($rules);
		if ($this->form_validation->run() === TRUE){
			return $data;
		}else{
			return FALSE;
		}
	}

}