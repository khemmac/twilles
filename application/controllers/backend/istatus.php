<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Istatus extends CI_Controller {

	public function index()
	{
		echo 'Istatus controller';
	}

	public function Set(){
		$type = X::Request('type');
		$ids = X::Request('ids');
		$is_active = X::Request('is_active');
		$is_active = ($is_active=='1')?1:0;

		if(!empty($ids)){
			$this->load->model($type.'_model',$type);

			$this->{$type}->update_many(explode(',', $ids), array(
				'is_active'=>$is_active
			));
		}
		X::renderJSON(array(
			'success'=>true,
			'data'=>$ids
		));
	}

}