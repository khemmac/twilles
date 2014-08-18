<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class promotion extends dao {//CI_Controller {

	function __construct(){
		parent::__construct();

		$this->load->model('promotion_code_model', 'promotion');
	}

	public function Insert()
	{

		$pk = $this->promotion->primary_key;
		$vs = $this->input->post(NULL, TRUE);

		$promotion_qty = $vs['promotion_qty'];
		$promotion_qty = (intval($promotion_qty)>0)?intval($promotion_qty):1;

		unset($vs['promotion_qty']);
		unset($vs['type']);
		unset($vs[$pk]);

		// invoke before functions
		$data = $this->trigger('before_create', $vs);

		// do insert
		$insert_result = 0;
		for($i=0;$i<$promotion_qty;$i++){
			$insert_result = $this->promotion->insert($data);
		}

		// assign primary key value to $data
		$data[$this->promotion->primary_key] = $insert_result;

		// invoke after functions
		$data = $this->trigger('after_create', $data);

		if($insert_result===FALSE){
			$errors = $this->promotion->form_validation->error_array();
			$msg = NULL;
			if(!empty($errors)){
				$msg = '';
				foreach($errors AS $e_v)
					$msg .= '- '.$e_v.'<br />';
			}
			X::renderJSON(array(
				'success'=>false,
				'errors'=>$errors,
				'message'=>$msg
			));
		}else
			X::renderJSON(array(
				'success'=>true,
				'data'=>array(
					$pk=>$insert_result
				)
			));
	}

	public function Update()
	{

		$pk = $this->promotion->primary_key;
		$vs = $this->input->post(NULL, TRUE);
		$id = $vs[$pk];
		unset($vs['promotion_qty']);
		unset($vs['type']);
		//unset($vs[$pk]);

		// invoke before functions
		$data = $this->trigger('before_update', $vs);

		// do update
		$update_result = $this->promotion->update($id, $data);

		//echo $this->promotion->_database->last_query();

		// assign primary key value to $data
		$data[$this->promotion->primary_key] = $id;

		// invoke after functions
		$data = $this->trigger('after_update', $data);

		if($update_result===FALSE){
			$errors = $this->promotion->form_validation->error_array();
			$msg = NULL;
			if(!empty($errors)){
				$msg = '';
				foreach($errors AS $e_v)
					$msg .= '- '.$e_v.'<br />';
			}
			X::renderJSON(array(
				'success'=>FALSE,
				'errors'=>$errors,
				'message'=>$msg
			));
		}else
			X::renderJSON(array(
				'success'=>TRUE,
				'data'=>$update_result
			));
	}

}