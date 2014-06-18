<?php

Class Order_payment_status_history_model extends MY_Model
{
	public $_table = 'tbl_order_payment_status_history';

	public $primary_key = 'id';

	public function InsertHistory($order_id, $status){
		$this->insert(array(
			'order_id'=>$order_id,
			'status'=>$status
		));
	}

    public $before_create = array( 'timestamps_create' );

    protected function timestamps_create($o)
    {
        $o['status_date'] = date('Y-m-d H:i:s');
        return $o;
    }

}