<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if (!defined('XORDER_ROOT')) {
    define('XORDER_ROOT', dirname(__FILE__) . '/');
    require(XORDER_ROOT . 'XOrder/Thumbnail.php');
}

class XOrder{

	public function __construct()
	{
		//$this->load->library('xutil');
	}

	public function getOrderItemHTML($item){

		$tmb = new Thumbnail();

		return $tmb->GenerateHTML($item);
	}

}