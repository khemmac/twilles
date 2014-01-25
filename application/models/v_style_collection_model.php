<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once('style_collection_model' . EXT);

Class V_style_collection_model extends Style_collection_model
{
	public $_table = 'v_style_collection';

	public $primary_key = 'id';

}