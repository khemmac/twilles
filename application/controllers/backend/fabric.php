<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class fabric extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');
	}

	public function upload()
	{
		$date = new DateTime();
		$time = $date->getTimestamp();
		$ulPath = FCPATH.'upload_temp/fabric/';
		echo $ulPath.PHP_EOL;

		$config['upload_path'] = $ulPath;
		$config['file_name'] = $time;
		$config['allowed_types'] = 'xls|xlsx';
		$size_mb = 20; //Max file size allowed in MB
 		$config['max_size'] = $size_mb * 1024; //
 		$config['remove_spaces'] = TRUE;
    	$config['encrypt_name'] = TRUE;


		$this->load->library('upload');
		$this->upload->initialize($config);
		print_r($_POST);
		print_r($_FILES);
		$ulResult = $this->upload->do_upload();
		echo '-------------------------------'.PHP_EOL;
		print_r($ulResult);
		echo '-------------------------------'.PHP_EOL;
		if (!$ulResult)
		{
			echo 'FAILURE';
		}
		else
		{
			echo 'SUCCESS';
		}
	}

}