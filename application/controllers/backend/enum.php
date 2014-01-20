<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Enum extends CI_Controller {

	public function index()
	{
		echo 'enum controller';
	}

	public function LoadListCombo_ConflictType(){
		$type = X::Request('type');
		$part_type = X::Request('part_type');
		$enums = EnumConflictType::getByPartType($part_type);
		//EnumConflictType::getByPartType($part_type);

		$rows = array();
		array_push($rows, array(
				'value'=>'',
				'text'=>'-- Select --'
			));
		foreach($enums AS $k=>$v)
			array_push($rows, array(
				'value'=>$v,
				'text'=>$k
			));

		X::renderJSON(array(
			'success'=>true,
			'data'=>(object)array(),
			'rows'=>$rows,
			'totalCount'=>count($enums)
		));
	}
/*
	public function SetStatus(){
		$ids = X::Request('ids');
		$is_active = X::Request('is_active');
		$is_active = ($is_active=='1')?1:0;

		if(!empty($ids)){
			$this->load->model('color_model','color');
			$this->color->update_many(explode(',', $ids), array(
				'is_active'=>$is_active
			));
		}
		X::renderJSON(array(
			'success'=>true,
			'data'=>$ids
		));
	}
*/
	/*public function LoadList(){
		$this->load->model('color_model','color');
		$cList = $this->color->get_all();
		print_r($cList);
	}*/

}