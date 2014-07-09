<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once('./application/libraries/tcpdf/tcpdf.php');
class Invoice_report extends CI_Controller {

	function __construct(){
		parent::__construct();

		$this->load->model('invoice_model','invoice');
		$this->load->model('v_invoice_model','v_invoice');
		$this->load->model('invoice_item_model','invoice_item');
		$this->load->model('v_invoice_item_model','v_invoice_item');
		//$this->load->model('v_order_model','v_order');
		//$this->load->model('v_order_item_model','v_order_item');
	}

	public function test(){
		$inv = $this->invoice->LoadByOrderId(75);
		print_r($inv);
	}

	public function report(){

		// prepare data
		$order_id = $this->uri->segment(4);
		$inv = $this->v_invoice->LoadByOrderId($order_id);

		$subTotal = $inv->total * (1.0 / (1.0 + ($inv->vat_percent / 100.0)));
		$vatAmount = $inv->total - $subTotal;

		$invSum = array(
			'discount'=> 0.0,
			'total' => $inv->total,
			'vat_percent'=> $inv->vat_percent,
			'vat_amount'=>$vatAmount,
			'sub_total'=>$subTotal
		);

		$invItemList = $this->v_invoice_item->get_many_by(array(
			'invoice_id'=>$inv->id
		));

		// populate pages data
		$all_p = array();
		$p = array();
		for($i=0;$i<count($invItemList);$i++){
			$r = $invItemList[$i];

			array_push($p, array(
				$i+1,
				$r->fabric_body_name,
				$r->item_price,
				$r->item_amount,
				$r->item_amount * $r->item_price
			));
			if(count($p)==15){
				array_push($all_p, $p);
				$p = array();
			}
		}
		if(count($p)>0)
			array_push($all_p, $p);

		// ######## PDF SECTION

		// create new PDF document
		$pdf = new InvoicePDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

		// set document information
		$pdf->SetCreator(PDF_CREATOR);
		$pdf->SetAuthor('TWILLES CLUB');
		$pdf->SetTitle('TWILLES INVOICE NUMBER '.$inv->invoice_code);

		// set default header data
		$pdf->SetHeaderData('header_invoice.png', 287, null, null, null, array(142, 122, 66));
		//$pdf->setPrintFooter(false);

		// set default monospaced font
		$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

		//set margins
		$pdf->SetMargins(4, 32, 4, 4);//PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		$pdf->SetHeaderMargin(4);//PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(4);//PDF_MARGIN_FOOTER);

		// *** ORIGINAL
		$pdf->SetFont('', '', '12');
		// Loop by page
		for($pi=0;$pi<count($all_p);$pi++){
			// print colored table
			$pdf->AddPage('L');
			$pdf->HeaderTable($inv);
			$pdf->Ln();
			$pdf->ItemTable($all_p[$pi]);
		}
		$pdf->SumTable($invSum);

		// *** COPY
		$pdf->resetHeaderTemplate();
		$pdf->SetHeaderData('header_invoice_copy.png', 287, null, null, null, array(142, 102, 66));

		$pdf->SetFont('', '', '12');
		// Loop by page
		for($pi=0;$pi<count($all_p);$pi++){
			// print colored table
			$pdf->AddPage('L');
			$pdf->HeaderTable($inv);
			$pdf->Ln();
			$pdf->ItemTable($all_p[$pi]);
		}
		$pdf->SumTable($invSum);

		//Close and output PDF document
		$pdf->Output('Invoice-'.$inv->invoice_code.'.pdf', 'I');

	}

	public function addFont(){
		$fontname = $pdf->addTTFfont('/path-to-font/DejaVuSans.ttf', 'TrueTypeUnicode', '', 32);
	}

}

class InvoicePDF extends TCPDF {

	public function HeaderTable($data) {
		// Colors, line width and bold font
		$this->SetFillColor(255, 255, 255);
		$this->SetTextColor(0);
		$this->SetDrawColor(0, 0, 0);
		$this->SetLineWidth(0.1);
		$this->SetFont('', 'B');

		$this->SetLineStyle(array('width' => 0.3, 'cap' => 'butt', 'join' => 'miter',
			'dash' => '1,2', 'color' => array(142, 102, 66)));

		$this->Cell(179, 8, 'Billed to:', 'LT', 0, 'L', 1, '', 0, 0, 'T', 'B');
		$this->Cell(50, 8, 'Invoice #', 'LT', 0, 'L', 1, '', 0, 0, 'T', 'B');
		$this->SetFont('', '');
		$this->Cell(60, 8, $data->invoice_code, 'RT', 0, 'R', 1, '', 0, 0, 'T', 'B');
		$this->Ln();

		$this->SetFont('', 'B');
		$this->Cell(179, 6, $data->bill_fullname, 'L', 0, 'L', 1, '', 0, 0, 'T', 'C');
		$this->Cell(50, 6, 'Invoice Date', 'L', 0, 'L', 1, '', 0, 0, 'T', 'C');
		$this->SetFont('', '');
		$this->Cell(60, 6, $data->invoice_date, 'R', 0, 'R', 1, '', 0, 0, 'T', 'C');
		$this->Ln();

		$this->SetFont('', 'B');
		$this->Cell(179, 8, $data->invoice_address, 'LB', 0, 'L', 1, '', 0, 0, 'T', 'T');
		$this->Cell(50, 8, '', 'LB', 0, 'L', 1, '', 0, 0, 'T', 'T');
		$this->SetFont('', '');
		$this->Cell(60, 8, '', 'RB', 0, 'R', 1, '', 0, 0, 'T', 'T');
		$this->Ln();

		$this->Cell('', 1, '', '');
	}

	public function ItemTable($data) {
		$header = array('Item', 'Description', 'Price', 'Unit', 'Total');

		// Colors, line width and bold font
		$this->SetFillColor(255, 255, 255);
		$this->SetTextColor(0);
		$this->SetDrawColor(0, 0, 0);
		$this->SetLineWidth(0.1);
		$this->SetFont('', 'B');
		// Header
		$w = array(24, 140, 40, 40, 45);
		$this->SetLineStyle(array('width' => 0.3, 'cap' => 'butt', 'join' => 'miter',
			'dash' => '1,2', 'color' => array(142, 102, 66)));

		$this->Cell($w[0], 12, $header[0], 'LT', 0, 'C', 1);
		$this->Cell($w[1], 12, $header[1], 'T', 0, 'L', 1);
		$this->Cell($w[2], 12, $header[2], 'T', 0, 'C', 1);
		$this->Cell($w[3], 12, $header[3], 'T', 0, 'C', 1);
		$this->Cell($w[4], 12, $header[4], 'RT', 0, 'C', 1);

		$this->Ln();
		// Color and font restoration
		$this->SetFillColor(242, 242, 242);
		$this->SetTextColor(0);
		$this->SetFont('');
		// Data
		$fill = 1;
		foreach($data as $row) {
			$this->Cell($w[0], 6, $row[0], 'L', 0, 'C', $fill);
			$this->Cell($w[1], 6, $row[1], '', 0, 'L', $fill);
			$this->Cell($w[2], 6, myNumberFormat($row[2]), '', 0, 'C', $fill);
			$this->Cell($w[3], 6, myNumberFormat($row[3]), '', 0, 'C', $fill);
			$this->Cell($w[4], 6, myNumberFormat($row[4]), 'R', 0, 'C', $fill);
			$this->Ln();
			$fill=!$fill;
		}
		$this->Cell(array_sum($w), 1, '', 'T');
	}

	public function SumTable($data) {
		// Colors, line width and bold font
		$this->SetFillColor(255, 255, 255);
		$this->SetTextColor(0);
		$this->SetDrawColor(0, 0, 0);
		$this->SetLineWidth(0.1);
		$this->SetFont('', 'B');

		// width of columns
		$w = array(179, 50, 60);

		$this->SetLineStyle(array('width' => 0.5, 'cap' => 'butt', 'join' => 'miter',
			'dash' => '1,2', 'color' => array(142, 102, 66)));

		$this->Ln();
		$this->Cell($w[0], 8, '', '');
		$this->Cell($w[1], 8, 'Discount', 'B', 0, 'L');
		$this->SetFont('', '');
		$this->Cell($w[2], 8, myNumberFormat($data['discount'], TRUE), 'B', 0, 'R');
		$this->Ln();
		$this->Cell($w[0], 8, '', '');
		$this->Cell($w[1], 8, 'Sub Total', 'B', 0, 'L');
		$this->SetFont('', '');
		$this->Cell($w[2], 8, myNumberFormat($data['sub_total'], TRUE), 'B', 0, 'R');
		$this->Ln();

		$this->SetLineStyle(array('width' => 1.5, 'cap' => 'butt', 'join' => 'miter',
			'dash' => 0, 'color' => array(142, 102, 66)));

		$this->SetFont('', '');
		$this->Cell($w[0], 8, '', '');
		$this->Cell($w[1], 8, 'Vat '.myNumberFormat($data['vat_percent']).'%', 'B', 0, 'L');
		$this->SetFont('', '');
		$this->Cell($w[2], 8, myNumberFormat($data['vat_amount'], TRUE), 'B', 0, 'R');
		$this->Ln();
		$this->SetFont('', 'B', '16');
		$this->Cell($w[0], 8, '', '');
		$this->Cell($w[1], 8, 'Total', '', 0, 'L');
		$this->SetFont('', '');
		$this->Cell($w[2], 8, myNumberFormat($data['total'], TRUE), '', 0, 'R');
	}

	// Page footer
	public function Footer() {
		// Position at 15 mm from bottom
		$this->SetY(-10);
		// Set font
		$this->SetFont('helvetica', 'I', 10);
		$this->Cell(0, 10, '*This receipt is required for submitting remake/alteration request ',
			0, false, 'L', 0, '', 0, false, 'T', 'M');
		// Page number
		//$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'L', 0, '', 0, false, 'T', 'M');
	}
}