<?php

Class Supplier_model extends Base_model
{
	public $_table = 'tbl_supplier';

	public $primary_key = 'id';

	protected $soft_delete = TRUE;
    protected $soft_delete_key = 'is_active';
	protected $_temporary_only_deleted = TRUE;

}