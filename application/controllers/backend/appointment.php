<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Appointment extends CI_Controller {

	public function index()
	{
		echo 'Appointment controller';
	}

	public function LoadStatusList(){

		$this->load->model('v_appointment_model','v_appointment');

		$appointment_id = X::Request('id');
		$o = $this->v_appointment->get($appointment_id);
		$r = array();

		if($o->status==2)
			array_push($r, array(
				'status'=>2,
				'status_name'=>'Completed',
				'status_date'=>$o->completed_date
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

	public function SetComplete(){
		$id = X::Request('id');

		if(!empty($id)){
			$this->load->model('appointment_model','appointment');

			$skipValidation = TRUE;
			$this->appointment->update($id, array(
				'status'=>2,
				'completed_date'=>date('Y-m-d H:i:s')
			), $skipValidation);
		}
		X::renderJSON(array(
			'success'=>true,
			'data'=>$id
		));
	}

}