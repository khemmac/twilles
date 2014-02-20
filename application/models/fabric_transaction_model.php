<?php

Class Fabric_transaction_model extends Base_model
{
	public $_table = 'tbl_fabric_transaction';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();


    }

	protected function _Filter($o){
		if(!empty($o->fabric_id))
			$this->_database->where('fabric_id', $o->fabric_id);
	}

}