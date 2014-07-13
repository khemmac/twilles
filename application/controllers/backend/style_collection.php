<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Style_collection extends dao {//CI_Controller {

	public function __construct()
    {
        parent::__construct();

		$this->load->model('style_collection_model','style_collection');
    }

	public function index()
	{
		echo 'Style collection controller';
	}

	public function check_duplicate_code($code){
		$id = X::Request('id');
		$style_type = X::Request('style_type');

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

	public function upload()
	{
		$uid = X::Request('uploadUid');

		$ulPath = $this->style_collection->photo_order_path;
		//echo $ulPath.PHP_EOL;

		$config['upload_path'] = $ulPath;
		$config['file_name'] = $uid;
		$config['allowed_types'] = 'png';
		$size_mb = 5; //Max file size allowed in MB
 		$config['max_size'] = $size_mb * 1024; //
 		//$config['remove_spaces'] = TRUE;
    	//$config['encrypt_name'] = TRUE;


		$this->load->library('upload');
		$this->upload->initialize($config);
		print_r($_POST);
		print_r($_FILES);
		$ulResult = $this->upload->do_upload();

		echo '$$$$$$$$$$$$$$$$$$$$$$$$$'.PHP_EOL;
		print_r($config);
		echo '$$$$$$$$$$$$$$$$$$$$$$$$$'.PHP_EOL;
		print_r($ulResult);
		echo '$$$$$$$$$$$$$$$$$$$$$$$$$'.PHP_EOL;

		if (!$ulResult)
		{
			echo 'FAILURE';
			$ulError = $this->upload->display_errors();
			echo PHP_EOL;
			print_r($ulError);
		}
		else
		{
			$ulData = $this->upload->data();
			$excel_file = $ulData['full_path'];

			echo $excel_file;
		}
	}

}