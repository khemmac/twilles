<?php

Class V_fabric_model extends Base_model
{
	public $_table = 'v_fabric';

	public $primary_key = 'id';

	protected $soft_delete = TRUE;
    protected $soft_delete_key = 'is_active';
	protected $_temporary_only_deleted = TRUE;

}