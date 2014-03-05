<?php

Class Order_model extends Base_model
{
	public $_table = 'tbl_order';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->before_create, 'before_create_generate_code');
    }

	public function before_create_generate_code($o){

		$sql = "
SELECT
CONCAT(
	LPAD(?, 8, '0'), -- MEMBER ID
	'1', -- Transaction code
	DATE_FORMAT(?, '%m%y'), -- Month and Year
	LPAD((SELECT COUNT(id)+1 FROM tbl_order WHERE member_id=?
		AND DATE_FORMAT(order_date, '%m%y')=DATE_FORMAT(?, '%m%y')
	), 3, '0') -- Running number (use id of tbl_order + 1)
) AS order_code
		";

		$q = $this->_database->query($sql, array(
			$o['member_id'], $o['order_date'],
			$o['member_id'], $o['order_date']
		));
		$r = $q->first_row();

		$o['order_code'] = $r->order_code;

		return $o;
	}

}