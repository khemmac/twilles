<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include_once('dao.php');
class Style_group_fabric extends dao {//CI_Controller {

	public function __construct()
    {
        parent::__construct();
    }

	public function index()
	{
		echo 'Style group fabric controller';
	}

	public function LoadList(){
		$filter = X::Request('filter');

		$style_group_id = X::Request('style_group_id');

		$this->load->model('style_group_fabric_model','style_group_fabric');
		$where = array();
		if(!empty($style_group_id))
			$where['style_group_id'] = $style_group_id;
		$style_group_fabric_list = $this->style_group_fabric->get_many_by($where);

		$this->load->model('v_fabric_model','fabric');

		// find by filter
		if(!empty($filter)){
			$filterList = X::parseJSON($filter);
			if(!empty($filterList)){
				foreach($filterList AS $f){
					if($f->field=='primary_color_name'){
						$this->fabric->_database->where_in('primary_color_id', $f->value);
					}
				}
			}
		}

		$fabric_all = $this->fabric->get_many_by();

		foreach($fabric_all AS $fabric){
			$fabric->checked = FALSE;
			foreach($style_group_fabric_list AS $style_group_fabric){
				if($fabric->id==$style_group_fabric->fabric_id){
					$fabric->checked = TRUE;
					break;
				}
			}
		}

		X::renderJSON(array(
			'success'=>TRUE,
			'data'=>(object)array(),
			'rows'=>$fabric_all,
			'totalCount'=>count($fabric_all)
		));
	}

}