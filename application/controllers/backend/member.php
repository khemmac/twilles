<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Member extends CI_Controller {

    protected $before_create = array();
    protected $after_create = array();
    protected $before_update = array();
    protected $after_update = array();

	function __construct(){
		parent::__construct();

		$this->load->model('user_model', 'user');
		$this->load->model('user_shipping_model', 'user_shipping');

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
		echo 'member controller';
	}

	public function Load()
	{
		$id = X::Request('id');
		$o = $this->ion_auth->user($id)->row();

		unset($o->password);
		unset($o->salt);
		unset($o->activation_code);
		unset($o->forgotten_password_code);
		unset($o->forgotten_password_time);

		$o->group = 2;
		$groups = $this->ion_auth->get_users_groups($id)->result();
		foreach($groups AS $g){
			if($g->id==1){
				$o->group = 1;
			}
		}

		// call model mapping
		$this->user->after_get_map_shipping($o);

		X::renderJSON(array(
			'success'=>true,
			'data'=>$o
		));
	}

	public function LoadList()
	{
		//$o = $this->ion_auth->user($id);

		$start = (int)X::Request('start');
		$limit = (int)X::Request('limit');
		$sort = X::Request('sort');
		$dir = X::Request('dir');

		// get TotalCount
		$totalCount = $this->ion_auth->db->count_all_results();
		//$this->ion_auth->num_rows();

		if(!empty($limit)){
			$this->ion_auth->limit($limit);
			$this->ion_auth->offset($start);
		}
		if(!empty($sort)){
			$this->ion_auth->order_by($sort, $dir);
		}

		$this->ion_auth->select(array(
'id',
'INET_NTOA(ip_address) as ip_address',
'username',
'email',
'created_on',
'last_login',
'active',
'first_name',
'last_name',
'company',
'phone',
'fid',
'account_status',
'create_date',
'create_by',
'update_date',
'update_by'
		));

		//$this->{$type}->excecute_filter($filter);
		$list = $this->ion_auth->users()->result();

		X::renderJSON(array(
			'success'=>true,
			'data'=>(object)array(),
			'rows'=>$list,
			'totalCount'=>$totalCount
		));
	}

	public function Insert()
	{
		$active = X::Request('active');
		$data = array(
			'phone'=>$this->input->post('phone'),
			'first_name'=>$this->input->post('first_name'),
			'last_name'=>$this->input->post('last_name'),
			//'active'=>$active,

			'mobile_number_country'=>X::Request('mobile_number_country'),
			'mobile_number'=>X::Request('mobile_number'),
			'mobile_number_ext'=>X::Request('mobile_number_ext'),

			'primary_address_fullname'=>X::Request('primary_address_fullname'),
			'primary_address_line_1'=>X::Request('primary_address_line_1'),
			'primary_address_line_2'=>X::Request('primary_address_line_2'),
			'primary_address_city'=>X::Request('primary_address_city'),
			'primary_address_state_province'=>X::Request('primary_address_state_province'),
			'primary_address_zip'=>X::Request('primary_address_zip'),
			'primary_address_country'=>X::Request('primary_address_country'),
			'primary_address_phone'=>X::Request('primary_address_phone'),
			'secondary_address_fullname'=>X::Request('secondary_address_fullname'),
			'secondary_address_line_1'=>X::Request('secondary_address_line_1'),
			'secondary_address_line_2'=>X::Request('secondary_address_line_2'),
			'secondary_address_city'=>X::Request('secondary_address_city'),
			'secondary_address_state_province'=>X::Request('secondary_address_state_province'),
			'secondary_address_zip'=>X::Request('secondary_address_zip'),
			'secondary_address_country'=>X::Request('secondary_address_country'),
			'secondary_address_phone'=>X::Request('secondary_address_phone')

		);
		$date_str = date('Y-m-d H:i:s', time());
        $data['create_date'] = $date_str;

		$user = $this->ion_auth->user()->row();
		$data['create_by'] = $user->username;

		$email_username = X::Request('email');

		$id = $this->ion_auth->register(
			$email_username,
			X::Request('password'),
			$email_username,
			$data,
			array(
				X::Request('group')
			)
		);
		if($id){
			// set member active on inactive
			//if($active==1)
				$this->ion_auth->activate($id);
			//else
			//	$this->ion_auth->deactivate($id);

			$this->user->after_create_save_shipping($id);

			X::renderJSON(array(
				'success'=>true,
				'data'=>array(
					'id'=>$id
				)
			));
		}else{
			X::renderJSON(array(
				'success'=>false,
				'errors'=>(object)array(),
				'message'=>'Create member unsuccess please try again.'
			));
		}
	}

	public function Update()
	{
		$id = X::Request('id');
		//$active = X::Request('active');

		$email_username = X::Request('email');

		$data = array(
			'username'=>$email_username,
			'email'=>$email_username,
			'phone'=>X::Request('phone'),
			'first_name'=>X::Request('first_name'),
			'last_name'=>X::Request('last_name'),

			'mobile_number_country'=>X::Request('mobile_number_country'),
			'mobile_number'=>X::Request('mobile_number'),
			'mobile_number_ext'=>X::Request('mobile_number_ext'),

			'primary_address_fullname'=>X::Request('primary_address_fullname'),
			'primary_address_line_1'=>X::Request('primary_address_line_1'),
			'primary_address_line_2'=>X::Request('primary_address_line_2'),
			'primary_address_city'=>X::Request('primary_address_city'),
			'primary_address_state_province'=>X::Request('primary_address_state_province'),
			'primary_address_zip'=>X::Request('primary_address_zip'),
			'primary_address_country'=>X::Request('primary_address_country'),
			'primary_address_phone'=>X::Request('primary_address_phone'),
			'secondary_address_fullname'=>X::Request('secondary_address_fullname'),
			'secondary_address_line_1'=>X::Request('secondary_address_line_1'),
			'secondary_address_line_2'=>X::Request('secondary_address_line_2'),
			'secondary_address_city'=>X::Request('secondary_address_city'),
			'secondary_address_state_province'=>X::Request('secondary_address_state_province'),
			'secondary_address_zip'=>X::Request('secondary_address_zip'),
			'secondary_address_country'=>X::Request('secondary_address_country'),
			'secondary_address_phone'=>X::Request('secondary_address_phone')
		);
		$date_str = date('Y-m-d H:i:s', time());
        $data['update_date'] = $date_str;

		$user = $this->ion_auth->user()->row();
		$data['update_by'] = $user->username;

		$password = $this->input->post('password');
		if(!empty($password))
			$data['password'] = $password;

		$update_result = $this->ion_auth->update($id, $data);
		if($update_result){
			// set member active on inactive
			//if($active==1)
			//	$this->ion_auth->activate($id);
			//else
			//	$this->ion_auth->deactivate($id);

			$data['id'] = $id;
			$this->user->after_update_save_shipping($data);

			X::renderJSON(array(
				'success'=>true,
				'data'=>array(
					'id'=>$id
				)
			));
		}else{
			X::renderJSON(array(
				'success'=>false,
				'errors'=>(object)array(),
				'message'=>'Update member unsuccess please try again.'
			));
		}
	}

	public function LoadAddress(){
		$id = X::Request('id');
		$sequence = X::Request('sequence');
		$o = null;
		if($sequence=='1')
			$o = $this->user_shipping->getPrimary($id);
		else if($sequence=='2')
			$o = $this->user_shipping->getSecondary($id);

		X::renderJSON(array(
			'success'=>true,
			'data'=>(empty($o))?'-':$o
		));
	}

	public function SetActive(){
		$id = X::Request('id');
		$active = X::Request('active');
		if($active=='1')
			$this->ion_auth->activate($id);
		else
			$this->ion_auth->deactivate($id);

		X::renderJSON(array(
			'success'=>true,
			'data'=>$id
		));
	}


}