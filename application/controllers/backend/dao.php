<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class dao extends CI_Controller {

    protected $before_create = array();
    protected $after_create = array();
    protected $before_update = array();
    protected $after_update = array();

	function __construct(){
		parent::__construct();

		// check logged in
		if (!$this->ion_auth->logged_in() || !$this->ion_auth->is_admin()){
			X::renderJSON(array(
				'success'=>false,
				'errors'=>(object)array(),
				'message'=>'Session is expired. please login again.'
			));
			exit();
		}
	}

	public function index()
	{
		echo 'dao controller';
	}

	public function _VoidMapping($o){
		return (object)array();
	}

	public function _ObjectMapping($o){
		return (object)array();
	}

	public function _ArrayMapping($list){
		$result = array();
		foreach ($list as $value){
			array_push($result,$value->export());
		}
		return $result;
	}

	public function _ListMapping($totalCount,$list){
		/*
		$result = array();
		foreach ($list as $value){
			array_push($result,$value->export());
		}
		return array(
			'TotalCount' => $totalCount,
			'List' => $result
		);
		*/
		return array(
			'TotalCount' => $totalCount,
			'List' => $list
		);
	}

	public function _Filter(){
		return (object)array();
	}

	public function Load()
	{
		$type = X::Request('type');
		$this->load->model($type.'_model',$type);

		$pk = $this->{$type}->primary_key;
		$id = X::Request($pk);
		$o = $this->{$type}->get($id);

		X::renderJSON(array(
			'success'=>true,
			'data'=>$o
		));
	}

	public function LoadList()
	{
		$type = X::Request('type');
		$filter = X::Request('filter');
		$start = (int)X::Request('start');
		$limit = (int)X::Request('limit');
		$sort = X::Request('sort');
		$dir = X::Request('dir');

		$this->load->model($type.'_model',$type);

		// get TotalCount
		$this->{$type}->excecute_filter($filter);
		$totalCount = $this->{$type}->count_by();

		if(!empty($limit))
			$this->{$type}->limit($limit, $start);
		if(!empty($sort))
			$this->{$type}->order_by($sort, $dir);

		$this->{$type}->excecute_filter($filter);
		$list = $this->{$type}->get_many_by();
		//echo $this->_database->last_query();

		//$lm = $this->_ListMapping($totalCount, $list);

		X::renderJSON(array(
			'success'=>true,
			'data'=>(object)array(),
			'rows'=>$list,
			'totalCount'=>$totalCount
		));
		/*
		$o = $this->_LoadList($type, $filterType, $json, $start, $limit, $sort, $dir, '_ListMapping');
		X::renderJSON(array(
			'success'=>true,
			'data'=>(object)array(),
			'rows'=>$o['List'],
			'totalCount'=>$o['TotalCount']
			));
		*/
	}

	public function Insert()
	{
		$type = X::Request('type');
		$this->load->model($type.'_model',$type);

		$pk = $this->{$type}->primary_key;
		$vs = $this->input->post(NULL, TRUE);
		unset($vs['type']);
		unset($vs[$pk]);

		// invoke before functions
		$data = $this->trigger('before_create', $vs);

		// do insert
		$insert_result = $this->{$type}->insert($data);

		// assign primary key value to $data
		$data[$this->{$type}->primary_key] = $insert_result;

		// invoke after functions
		$data = $this->trigger('after_create', $data);

		if($insert_result===FALSE){
			$errors = $this->{$type}->form_validation->error_array();
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
		$type = X::Request('type');
		$this->load->model($type.'_model',$type);

		$pk = $this->{$type}->primary_key;
		$vs = $this->input->post(NULL, TRUE);
		$id = $vs[$pk];
		unset($vs['type']);
		unset($vs[$pk]);

		// invoke before functions
		$data = $this->trigger('before_update', $vs);

		// do update
		$update_result = $this->{$type}->update($id, $data);

		// assign primary key value to $data
		$data[$this->{$type}->primary_key] = $id;

		// invoke after functions
		$data = $this->trigger('after_update', $data);

		if($update_result===FALSE){
			$errors = $this->{$type}->form_validation->error_array();
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

	public function trigger($event, $data = FALSE, $last = TRUE)
    {
        if (isset($this->$event) && is_array($this->$event))
        {
            foreach ($this->$event as $method)
            {
                if (strpos($method, '('))
                {
                    preg_match('/([a-zA-Z0-9\_\-]+)(\(([a-zA-Z0-9\_\-\., ]+)\))?/', $method, $matches);

                    $method = $matches[1];
                    $this->callback_parameters = explode(',', $matches[3]);
                }

                $data = call_user_func_array(array($this, $method), array($data, $last));
            }
        }
        return $data;
    }

/*

	public function _Delete($type,$ids,$mapping)
	{
		foreach (explode(",", $ids) as $value){
			$o = X::dispense($type);
			$o->id=(int)$value;
			X::trash($o);
		}
		return $this->{$mapping}(null);
	}
*/
}