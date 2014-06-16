<?php

Class User_model extends Base_model
{
	public $_table = 'tbl_user';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		$this->load->model('user_shipping_model', 'user_shipping');

		array_push($this->after_get, 'after_get_map_shipping');
		array_push($this->after_create, 'after_create_save_shipping');
		array_push($this->after_update, 'after_update_save_shipping');
    }

	public function after_get_map_shipping($o){
		if(empty($o))
			return $o;
		$p = $this->user_shipping->getPrimary($o->id);
		if(!empty($p)){
			$o->primary_address_fullname  = $p->full_name;
			$o->primary_address_line_1  = $p->address_line_1;
			$o->primary_address_line_2  = $p->address_line_2;
			$o->primary_address_city  = $p->city;
			$o->primary_address_state_province  = $p->state;
			$o->primary_address_zip  = $p->zip;
			$o->primary_address_country  = $p->country;
			$o->primary_address_phone  = $p->phone;
		}
		$s = $this->user_shipping->getSecondary($o->id);
		if(!empty($s)){
			$o->secondary_address_fullname  = $p->full_name;
			$o->secondary_address_line_1  = $p->address_line_1;
			$o->secondary_address_line_2  = $p->address_line_2;
			$o->secondary_address_city  = $p->city;
			$o->secondary_address_state_province  = $p->state;
			$o->secondary_address_zip  = $p->zip;
			$o->secondary_address_country  = $p->country;
			$o->secondary_address_phone  = $p->phone;
		}
		return $o;
	}

	public function after_create_save_shipping($inserted_id){
		//echo 'CREATE GET ID : '.$inserted_id;
		$this->saveShippingByUserId($inserted_id);
	}

	public function after_update_save_shipping($o){
		if(empty($o)) return $o;

		$id = (is_array($o))?$o['id']:$o->id;

		//echo 'UPDATE : '.$id.PHP_EOL;
		//print_r($o);

		$this->saveShippingByUserId($id);
	}

	private function isEmptyPrimary($u){
		return (empty($u->primary_address_fullname)
				&& empty($u->primary_address_line_1)
				&& empty($u->primary_address_line_2)
				&& empty($u->primary_address_city)
				&& empty($u->primary_address_state_province)
				&& empty($u->primary_address_zip)
				&& empty($u->primary_address_country)
				&& empty($u->primary_address_phone)
		);
	}

	private function isEmptySecondary($u){
		return (empty($u->secondary_address_fullname)
				&& empty($u->secondary_address_line_1)
				&& empty($u->secondary_address_line_2)
				&& empty($u->secondary_address_city)
				&& empty($u->secondary_address_state_province)
				&& empty($u->secondary_address_zip)
				&& empty($u->secondary_address_country)
				&& empty($u->secondary_address_phone)
		);
	}

	private function saveShippingByUserId($user_id){
		// load by activerecord directly
		$qUser = $this->db->get_where($this->_table, array(
			'id'=>$user_id
		));
		$u = $qUser->first_row();

		if(!empty($u)){
			// check primary
			if(!$this->isEmptyPrimary($u)){
				$pData = array(
					'full_name'=>$u->primary_address_fullname,
					'address_line_1'=>$u->primary_address_line_1,
					'address_line_2'=>$u->primary_address_line_2,
					'city'=>$u->primary_address_city,
					'state'=>$u->primary_address_state_province,
					'zip'=>$u->primary_address_zip,
					'country'=>$u->primary_address_country,
					'phone'=>$u->primary_address_phone
				);

				$p = $this->user_shipping->getPrimary($user_id);
				if(!empty($p)){
					$this->user_shipping->update($p->id, $pData);
				}else{
					$pData['member_id'] = $user_id;
					$this->user_shipping->insert($pData);
				}
			}

			if(!$this->isEmptySecondary($u)){
				$pData = array(
					'full_name'=>$u->secondary_address_fullname,
					'address_line_1'=>$u->secondary_address_line_1,
					'address_line_2'=>$u->secondary_address_line_2,
					'city'=>$u->secondary_address_city,
					'state'=>$u->secondary_address_state_province,
					'zip'=>$u->secondary_address_zip,
					'country'=>$u->secondary_address_country,
					'phone'=>$u->secondary_address_phone
				);

				$p = $this->user_shipping->getSecondary($user_id);
				if(!empty($p)){
					$this->user_shipping->update($p->id, $pData);
				}else{
					$pData['member_id'] = $user_id;
					$this->user_shipping->insert($pData);
				}
			}

			// check secondary

		}
	}

}