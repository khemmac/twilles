<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class V_order_item_model extends Base_model
{
	public $_table = 'v_order_item';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		$this->load->model('style_collection_model','style_collection');

		array_push($this->after_get, 'afterGetMapping');
    }

	protected function _Filter($o){
		if(!empty($o->order_id))
			$this->_database->where('order_id', $o->order_id);
	}

	public function afterGetMapping($o){
		// GET PHOTO FROM STYLE COLLECTION
		$o->photo_style_collection = null;
		if(!empty($o->style_collection_id)){
			$o->photo_style_collection = $this->style_collection->getPhotoOrderNameById($o->style_collection_id);
		}
		return $o;
	}

}