<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class customize extends CI_Controller {

	function __construct(){
		parent::__construct();

		$this->load->model('color_model','color');
		$this->load->model('texture_model','texture');
		$this->load->model('pattern_model','pattern');
		$this->load->model('fabric_model','fabric');
		$this->load->model('inventory_model','inventory');

	}

	public function index()
	{
		// load color
		$colors = $this->color->get_many_by();

		// load texture
		$textures = $this->texture->get_many_by();

		// load pattern
		$patterns = $this->pattern->get_many_by();

		// load fabric
		$fabrics = $this->fabric->get_many_by();

		// load inventory type button
		$this->inventory->excecute_filter('{"inventory_type":1}');
		$buttons = $this->inventory->get_many_by();


		$this->phxview->RenderView('front/customize', array(
			'colors'=>$colors,
			'textures'=>$textures,
			'patterns'=>$patterns,
			'fabrics'=>$fabrics,
			'buttons'=>$buttons
		));
        $this->phxview->RenderLayout('front_default');
	}

	public function overview()
	{
		$this->phxview->RenderView('front/customize_overview');
        $this->phxview->RenderLayout('front_default');
	}

	public function detail()
	{
		$this->phxview->RenderView('front/customize_detail');
        $this->phxview->RenderLayout('front_default');
	}
}