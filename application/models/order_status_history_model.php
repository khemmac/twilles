<?php

Class Order_status_history_model extends MY_Model
{
	public $_table = 'tbl_order_status_history';

	public $primary_key = 'id';

    public $before_create = array( 'timestamps_create' );

    protected function timestamps_create($o)
    {
        $o['status_date'] = date('Y-m-d H:i:s');
        return $o;
    }

}