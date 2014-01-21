<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class auth extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->library('form_validation');

		$this->form_validation->set_error_delimiters($this->config->item('error_start_delimiter', 'ion_auth'), $this->config->item('error_end_delimiter', 'ion_auth'));

		$this->lang->load('auth');
		$this->load->helper('language');
	}

	public function index()
	{
		redirect('backend/auth/login');
	}

	public function login(){
		$this->phxview->RenderView('cms/login');
        $this->phxview->RenderLayout('ext_empty');
	}

	//log the user in
	function do_login()
	{
		$this->data['title'] = "Login";

		//validate form input
		$this->form_validation->set_rules('username', 'Username', 'required');
		$this->form_validation->set_rules('password', 'Password', 'required');

		if ($this->form_validation->run() == true)
		{
			//check to see if the user is logging in
			//check for "remember me"
			$remember = FALSE;//(bool) $this->input->post('remember');

			if ($this->ion_auth->login($this->input->post('username'), $this->input->post('password'), $remember))
			{
				//if the login is successful
				//redirect them back to the home page
				// $this->session->set_flashdata('message', $this->ion_auth->messages());
				// redirect('cms/order', 'refresh');
				X::renderJSON(array(
					'success'=>TRUE,
					'data'=>$this->ion_auth->messages()
				));
			}
			else
			{
				//if the login was un-successful
				//redirect them back to the login page
				// $this->session->set_flashdata('message', $this->ion_auth->errors());
				// redirect('cms/login', 'refresh');
				//use redirects instead of loading views for compatibility with MY_Controller libraries
				X::renderJSON(array(
					'success'=>FALSE,
					'message'=>$this->ion_auth->errors()
				));
			}
		}
		else
		{
			//the user is not logging in so display the login page
			//set the flash data error message if there is one
			$this->data['message'] = (validation_errors()) ? validation_errors() : $this->session->flashdata('message');

			$this->data['identity'] = array('name' => 'identity',
				'id' => 'identity',
				'type' => 'text',
				'value' => $this->form_validation->set_value('identity'),
			);
			$this->data['password'] = array('name' => 'password',
				'id' => 'password',
				'type' => 'password',
			);

			$errors = $this->form_validation->error_array();

			// $this->_render_page('cms/login', $errors);
		}
	}

	//log the user out
	function do_logout()
	{
		//log the user out
		$logout = $this->ion_auth->logout();

		redirect('cms/login', 'refresh');
	}

}
