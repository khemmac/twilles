<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Style_collection extends dao {//CI_Controller {

	public function __construct()
    {
        parent::__construct();

    }

	public function index()
	{
		echo 'Style collection controller';
	}

	public function check_duplicate_code($code){
		$id = X::Request('id');
		$style_type = X::Request('style_type');

		$this->load->model('style_collection_model','style_collection');
		$pk = $this->style_collection->primary_key;

		$w = array(
			'code' => $code,
			'style_type' => $style_type
		);

		$cnt = 0;
		if(!empty($id)){
			$w[$pk.' !='] = $id;
			$cnt = $this->style_collection->count_by($w);
		}

		if($cnt>0){
			$this->form_validation->set_message('check_duplicate_code', '%s "'.$code.'" is exist please use another.');
			return FALSE;
		}else
			return TRUE;
	}

}