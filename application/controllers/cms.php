<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class cms extends CI_Controller {
	public function index()
	{
		redirect('/cms/login');
	}

	public function login()
	{
		$this->phxview->RenderView('cms/login');
        $this->phxview->RenderLayout('ext_empty');
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

	public function style_group()
	{
		$this->phxview->RenderView('cms/style_group');
        $this->phxview->RenderLayout('ext_default');
	}

}