<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Style_group extends dao {//CI_Controller {

	public function __construct()
    {
        parent::__construct();


		array_push($this->after_create, 'after_func_save_fabric');

		array_push($this->after_update, 'after_func_save_fabric');
    }

	public function after_func_save_fabric($o){
		//echo 'before create called success';
		$json = X::Request('fabric_ids');
		$json_obj = json_decode($json);

		$this->load->model('style_group_model','style_group');
		$this->load->model('style_group_fabric_model','style_group_fabric');

		// recieved style_group_id
		$style_group_id = $o[$this->style_group->primary_key];

		// remove all previous style_group_fabric
		$this->style_group_fabric->delete_by(array(
			'style_group_id'=>$style_group_id
		));

		// loop insert into style_group_fabric
		for($i=0;$i<count($json_obj);$i++){
			$fabric_id = $json_obj[$i];

			$mm_data = array(
				'fabric_id'=>$fabric_id,
				'style_group_id'=>$style_group_id
			);

			$this->style_group_fabric->insert($mm_data);
		}

		return $o;
	}

	public function index()
	{
		echo 'Style group controller';
	}

	// call back method for validation
	public function check_json($code){
		$json = X::Request('fabric_ids');

		$json_object = json_decode($json);
		if(empty($json_object)){
			$this->form_validation->set_message('check_json', 'Please select %s at least one item.');
			return FALSE;
		}else{
			return TRUE;
		}
	}

	public function check_unique_name($name){
		$id = X::Request('id');

		$this->load->model('style_group_model','style_group');
		$pk = $this->style_group->primary_key;

		$w = array(
			'name' => $name
		);

		$cnt = 0;
		if(!empty($id)){
			$w[$pk.' !='] = $id;
			$cnt = $this->style_group->count_by($w);
		}

		if($cnt>0){
			$this->form_validation->set_message('check_unique_name', '%s "'.$name.'" is exist please use another.');
			return FALSE;
		}else
			return TRUE;
	}

}