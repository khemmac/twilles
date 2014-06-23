<?php

Class Invoice_model extends Base_model
{
	public $_table = 'tbl_invoice';

	public $primary_key = 'id';

	public function __construct()
    {
        parent::__construct();

		array_push($this->before_create, 'before_create_generate_code');

		$this->load->model('order_model', 'order');
		$this->load->model('v_order_model', 'v_order');
		$this->load->model('v_order_item_model', 'v_order_item');
		$this->load->model('invoice_item_model', 'invoice_item');
    }

    public function before_create_generate_code($o){

		$sql = "
SELECT
CONCAT(
	DATE_FORMAT(?, '%Y%m%d'), -- Month and Year
	LPAD((SELECT member_id FROM tbl_order WHERE id=?), 8, '0'), -- MEMBER ID
	LPAD((SELECT COUNT(vi.id)+1 FROM v_invoice vi WHERE member_id=(SELECT member_id FROM tbl_order WHERE id=?)
		AND DATE_FORMAT(invoice_date, '%y%m%d')=DATE_FORMAT(?, '%y%m%d')
	), 3, '0') -- Running number (use id of v_invoice + 1)
) AS invoice_code
		";

		$q = $this->_database->query($sql, array(
			$o['invoice_date'], $o['order_id'], $o['order_id'],
			$o['invoice_date']
		));
		$r = $q->first_row();

		$o['invoice_code'] = $r->invoice_code;

		return $o;
	}

	public function LoadByOrderId($orderId){
		if(empty($orderId))
			throw new Exception("ORDER ID IS NOT FOUND", 1);

		$odr = $this->v_order->get($orderId);
		if(empty($odr))
			throw new Exception("ORDER IS NOT FOUND AT ID : $orderId", 1);

		$inv = $this->get_by(array(
			'order_id'=>$odr->id
		));

		// find order last update
		$odrLastUpdate = (empty($odr->update_date))?$odr->create_date:$odr->update_date;

		if(!empty($inv)){

			if($inv->import_date != $odrLastUpdate){
				$mustUpdate = TRUE;

				// delete invoice item
				$this->invoice_item->delete_by(array(
					'invoice_id'=>$inv->id
				));

				$curDate = date('Y-m-d H:i:s');
				// update invoice header
				$res = $this->update($inv->id, array(
					'bill_fullname' => $odr->member_fullname,
					'total' => $odr->total,
					'vat_percent' => 7,
					'import_date' => $odrLastUpdate
				));

				// insert invoice item
				$this->InsertInvoiceItem($odr->id, $inv->id);

				$inv = $this->get($inv->id);
				return $inv;
			}else{
				return $inv;
			}
		}else{
			$mustCreate = TRUE;

			$curDate = date('Y-m-d H:i:s');
			// insert invoice
			$res = $this->insert(array(
				'order_id' => $odr->id,
				'invoice_date' => $curDate,
				'bill_fullname' => $odr->member_fullname,
				'total' => $odr->total,
				'vat_percent' => 7,
				'import_date' => $odrLastUpdate
			));
			// insert invoice item
			$this->InsertInvoiceItem($odr->id, $res);

			$inv = $this->get($res);
			return $inv;
		}

		return $inv;
	}

	private function InsertInvoiceItem($orderId, $invoiceId){
		$orderItemList = $this->v_order_item->get_many_by(array( 'order_id'=>$orderId ));
		foreach($orderItemList AS $oi){
			$this->invoice_item->insert(array(
				'invoice_id'=>$invoiceId,
				'order_item_id'=>$oi->id,
				'item_amount'=>$oi->item_amount,
				'item_price'=>$oi->item_price
			));
		}
	}

}