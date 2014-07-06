<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Ipriority extends dao {//CI_Controller {

	public function index()
	{
		echo 'Ipriority controller';
	}

	public function LoadTree(){
		$type = X::Request('type');
		$this->load->model($type.'_model',$type);
		$fields = $this->{$type}->tree_fields;
		$this->{$type}->_database->select($fields);
		$this->{$type}->order_by('priority', 'ASC');
		$res = $this->{$type}->get_many_by();

		foreach($res AS $o){
			$o->leaf = TRUE;
		}
		$res = $this->{$type}->populate_tree($res);
		X::renderJSON($res);
	}

	public function SavePriority(){
		$type = X::Request('type');
		$jsonData = X::Request('jsonData');
		$groupId = X::Request('groupId');

		$this->load->model($type.'_model',$type);
		$tbl = $this->{$type}->_table;
		$pk = $this->{$type}->primary_key;

		$data = array();
		$jsonObjectArray = json_decode($jsonData);
		foreach($jsonObjectArray AS $o){
			array_push($data, array(
				$pk=>$o->id,
				'priority'=>$o->priority
			));
		}
		//print_r($data);
/*
		$data = array(
   array(
      'title' => 'My title' ,
      'name' => 'My Name 2' ,
      'date' => 'My date 2'
   ),
   array(
      'title' => 'Another title' ,
      'name' => 'Another Name 2' ,
      'date' => 'Another date 2'
   )
);
*/
		$this->db->update_batch($tbl, $data, $pk);
		X::renderJSON(array(
			'success'=>true,
			'data'=>'Update priority success'
		));
	}

}