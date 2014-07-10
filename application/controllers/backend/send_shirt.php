<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Send_shirt extends CI_Controller {

	function __construct(){
		parent::__construct();

		$this->load->model('send_shirt_model','send_shirt');
		$this->load->model('v_send_shirt_model','v_send_shirt');
	}

	public function index()
	{
		echo 'Send shirt controller';
	}

	public function LoadStatusList(){
		$appointment_id = X::Request('id');
		$o = $this->v_send_shirt->get($appointment_id);
		$r = array();

		if($o->status==3)
			array_push($r, array(
				'status'=>3,
				'status_name'=>'Completed',
				'status_date'=>$o->completed_date
			));

		if($o->status>=2)
			array_push($r, array(
				'status'=>2,
				'status_name'=>'Returned',
				'status_date'=>$o->returned_date
			));

		array_push($r, array(
			'status'=>1,
			'status_name'=>'Requested',
			'status_date'=>$o->create_date
		));

		X::renderJSON(array(
			'success'=>true,
			'data'=>(object)array(),
			'rows'=>$r,
			'totalCount'=>count($r)
		));
	}

	public function SetReturn(){
		$id = X::Request('id');

		if(!empty($id)){
			$skipValidation = TRUE;
			$this->send_shirt->update($id, array(
				'status'=>2,
				'returned_date'=>date('Y-m-d H:i:s')
			), $skipValidation);
		}
		X::renderJSON(array(
			'success'=>true,
			'data'=>$id
		));
	}

	public function SetComplete(){
		$id = X::Request('id');

		if(!empty($id)){
			$skipValidation = TRUE;
			$this->send_shirt->update($id, array(
				'status'=>3,
				'completed_date'=>date('Y-m-d H:i:s')
			), $skipValidation);
		}
		X::renderJSON(array(
			'success'=>true,
			'data'=>$id
		));
	}

}