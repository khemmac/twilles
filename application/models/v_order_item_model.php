<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

Class V_order_item_model extends Base_model
{
	public $_table = 'v_order_item';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->after_get, 'after_get_setDefault');
    }

	public function after_get_setDefault($o){
		if(is_null($o->stitching_type)){
			$o->stitching_type = '2';
			$o->stitching_type_name = 'เย็บธรรมดา';
		}

		if(is_null($o->part_collar_type)){
			$o->part_collar_type = '1';
		}
		if(is_null($o->part_collar_thickness))
			$o->part_collar_thickness = 'หนานุ่มแข็ง 2 ชั้น';
		if(is_null($o->part_collar_stay)){
			$o->part_collar_stay = '1';
			$o->part_collar_stay_name = 'Yes';
		}

		if(is_null($o->part_cuff_type)){
			$o->part_cuff_type = '1';
		}
		if(is_null($o->part_cuff_thickness))
			$o->part_cuff_thickness = 'หนานุ่มแข็ง 3 ชั้น';

		if(is_null($o->inventory_package_id)){
			$o->inventory_package_id = 'P1';
			$o->inventory_package_name = 'แพ็คแข็ง';
		}

		return $o;
	}

	protected function _Filter($o){
		if(!empty($o->order_id))
			$this->_database->where('order_id', $o->order_id);
	}

}