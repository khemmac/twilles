<?php

Class Fabric_type_model extends Base_model
{
	public $_table = 'tbl_fabric_type';

	public $primary_key = 'id';

	protected $soft_delete = TRUE;
    protected $soft_delete_key = 'is_active';
	protected $_temporary_only_deleted = TRUE;

	public function __construct()
    {
        parent::__construct();
    }

}