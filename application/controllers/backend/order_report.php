<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Order_report extends CI_Controller {

	public function report(){
		$order_id = $this->uri->segment(4);
		$this->load->model('v_order_model','v_order');
		$order = $this->v_order->get($order_id);


		require_once('./application/libraries/tcpdf/tcpdf.php');

		// create new PDF document
		$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

		// set document information
		$pdf->SetCreator(PDF_CREATOR);
		$pdf->SetAuthor('test author');
		$pdf->SetTitle('test pdf');

		// set header and footer fonts
		$pdf->setHeaderFont(Array('angsanaupc', '', 15));

		// set default header data
		$pdf->SetHeaderData('twilles_logo.png', 30, 'ใบสั่งตัดเสื้อ บริษัท ทวิลส์ คลับ จำกัด', '8/61 หมู่บ้านพิบูล');
		//$pdf->SetHeaderData(PDF_HEADER_LOGO, 20, PDF_HEADER_TITLE.' PRINT', PDF_HEADER_STRING);
		// remove default header/footer
		//$pdf->setPrintHeader(false);
		//$pdf->setPrintFooter(false);

		// set default monospaced font
		$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

		//set margins
		$pdf->SetMargins(4, 32, 4, 0);//PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		$pdf->SetHeaderMargin(3);//PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(0);//PDF_MARGIN_FOOTER);

		//set auto page breaks
		$pdf->SetAutoPageBreak(FALSE, 1);//(TRUE, PDF_MARGIN_BOTTOM);

		//set image scale factor
		//$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

		//set some language-dependent strings
		$pdf->setLanguageArray('thai');

		// ---------------------------------------------------------

		// add a page
		$pdf->AddPage();

		// ---- START PDF CONTENT
		// ***** USER INFO *****
		$pdf->SetFont('angsanaupc', 'B', 19);
$tbl = '<table cellspacing="0" cellpadding="3" border="0">
    <tr>
        <td rowspan="4" width="20" width="20"></td>
        <td width="305">คุณ '.$order->member_fullname.' ('.$order->member_email.')</td>
        <td rowspan="4" width="10"></td>
        <td rowspan="4" align="center">
        	<table cellspaceing="0" cellpadding="3" border="1">
        		<tr><td style="background-color:#eeeeee;">รหัส<br />'.$order->order_code.'</td></tr>
        	</table>
        </td>
    </tr>
</table>';
		$pdf->writeHTML($tbl, true, false, false, false, '');
		// ***** END USER INFO *****

		// define barcode style
		$style = array(
			'position' => '',
			'align' => 'C',
			'stretch' => false,
			'fitwidth' => true,
			'cellfitalign' => '',
			'border' => true,
			'hpadding' => 'auto',
			'vpadding' => 'auto',
			'fgcolor' => array(0,0,0),
			'bgcolor' => false, //array(255,255,255),
			'text' => true,
			'font' => 'helvetica',
			'fontsize' => 8,
			'stretchtext' => 4
		);


		function ColoredTable($_pdf, $header,$data) {
			// Colors, line width and bold font
			$_pdf->SetFillColor(25, 25, 25);
			$_pdf->SetTextColor(255);
			$_pdf->SetDrawColor(0, 0, 0);
			$_pdf->SetLineWidth(0.3);
			$_pdf->SetFont('', 'B');
			// Header
			$w = array(20, 40, 25, 30, 40);
			$num_headers = count($header);
			for($i = 0; $i < $num_headers; ++$i) {
				$_pdf->Cell($w[$i], 7, $header[$i], 1, 0, 'C', 1);
			}
			$_pdf->Ln();
			// Color and font restoration
			$_pdf->SetFillColor(224, 235, 255);
			$_pdf->SetTextColor(0);
			$_pdf->SetFont('');
			// Data
			$fill = 0;
			foreach($data as $row) {
				$_pdf->Cell($w[0], 6, $row[0], 'LRTB', 0, 'C', $fill);
				$_pdf->Cell($w[1], 6, $row[1], 'LRTB', 0, 'L', $fill);
				$_pdf->Cell($w[2], 6, number_format($row[2]), 'LRTB', 0, 'R', $fill);
				$_pdf->Cell($w[3], 6, number_format($row[3]), 'LRTB', 0, 'R', $fill);
				$_pdf->Cell($w[4], 6, number_format($row[4]), 'LRTB', 0, 'R', $fill);
				$_pdf->Ln();
				$fill=!$fill;
			}
			$_pdf->SetFillColor(220, 220, 220);
			// SUM
			$_pdf->Cell(array_sum(array($w[0],$w[1],$w[2],$w[3]))
				, 6, 'ราคารวม', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[4], 6, number_format(39000), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			// total
			$_pdf->Cell(array_sum(array($w[0],$w[1],$w[2],$w[3]))
				, 6, 'ราคาสุทธิ', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[4], 6, number_format(37050), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			//$_pdf->Cell(array_sum($w), 0, '', 'T');
		}

		$pdf->SetFont('angsanaupc', '', 15);
		ColoredTable($pdf, array('รายการที่', 'ผ้าตัว','จำนวน','ราคา','รวม'),
			array(
				array('1','A1',4,6000,24000),
				array('2','B2',3,5000,15000)
		));

		//$pdf->Write(0, $txt, '', 0, 'L', true, 0, false, false, 0);
		//$pdf->writeHTML($html, true, false, true, false, '');

		// set javascript
		//$pdf->IncludeJS('print(true);');
		// ---------------------------------------------------------

		//Close and output PDF document
		$pdf_name = 'odrxxxxxxx';
		$pdf->Output($pdf_name.'.pdf', 'I');
	}

}
