<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class cms extends CI_Controller {

	function __construct(){
		parent::__construct();

		// check logged in
		if (!$this->ion_auth->logged_in() || !$this->ion_auth->is_admin()){
			redirect('backend/auth/login', 'refresh');
		}
	}

	public function index()
	{
		redirect('backend/auth/login', 'refresh');
	}

	public function login()
	{
		redirect('backend/auth/login', 'refresh');
	}

	public function color()
	{
		$this->phxview->RenderView('cms/color');
        $this->phxview->RenderLayout('ext_default');
	}

	public function pattern()
	{
		$this->phxview->RenderView('cms/pattern');
        $this->phxview->RenderLayout('ext_default');
	}

	public function texture()
	{
		$this->phxview->RenderView('cms/texture');
        $this->phxview->RenderLayout('ext_default');
	}

	public function thread_count()
	{
		$this->phxview->RenderView('cms/thread_count');
        $this->phxview->RenderLayout('ext_default');
	}

	public function supplier()
	{
		$this->phxview->RenderView('cms/supplier');
        $this->phxview->RenderLayout('ext_default');
	}

	public function inventory()
	{
		$this->phxview->RenderView('cms/inventory');
        $this->phxview->RenderLayout('ext_default');
	}

	public function fabric()
	{
		$this->phxview->RenderView('cms/fabric');
        $this->phxview->RenderLayout('ext_default');
	}

	public function fabric_type()
	{
		$this->phxview->RenderView('cms/fabric_type');
        $this->phxview->RenderLayout('ext_default');
	}

	public function part_style()
	{
		$this->phxview->RenderView('cms/part_style');
        $this->phxview->RenderLayout('ext_default');
	}

	public function style_collection()
	{
		$this->phxview->RenderView('cms/style_collection');
        $this->phxview->RenderLayout('ext_default');
	}

	public function trend_style_collection()
	{
		$this->phxview->RenderView('cms/trend_style_collection');
        $this->phxview->RenderLayout('ext_default');
	}

	public function style_group()
	{
		$this->phxview->RenderView('cms/style_group');
        $this->phxview->RenderLayout('ext_default');
	}

	public function size()
	{
		$this->phxview->RenderView('cms/size');
        $this->phxview->RenderLayout('ext_default');
	}

	public function member()
	{
		$this->phxview->RenderView('cms/member');
        $this->phxview->RenderLayout('ext_default');
	}

	public function order()
	{
		$this->phxview->RenderView('cms/order');
        $this->phxview->RenderLayout('ext_default');
	}

}