<?php

Class User_shipping_model extends MY_Model
{
	public $_table = 'tbl_user_shipping';

	public $primary_key = 'id';

	public function getManyByMember($user_id){
		$this->order_by('id', 'ASC');
		$aList = $this->get_many_by(array(
			'member_id'=>$user_id
		));
		return $aList;
	}

	public function getPrimary($user_id){
		$aList = $this->getManyByMember($user_id);
		if(count($aList)>0)
			return $aList[0];
		return null;
	}

	public function getSecondary($user_id){
		$aList = $this->getManyByMember($user_id);
		if(count($aList)>=2)
			return $aList[1];
		return null;
	}

}