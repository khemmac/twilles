<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Order_report extends CI_Controller {

	public function report(){

		// prepare data
		$order_id = $this->uri->segment(4);
		$this->load->model('v_order_model','v_order');
		$order = $this->v_order->get($order_id);

		$this->load->model('v_order_item_model','v_order_item');
		$order_item = $this->v_order_item->get_many_by(array('order_id'=>$order_id));

		$pdf_name = $order->order_code;

		// begin pdf
		require_once('./application/libraries/tcpdf/tcpdf.php');

		// create new PDF document
		$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

		// set document information
		$pdf->SetCreator(PDF_CREATOR);
		$pdf->SetAuthor('TWILLES CLUB');
		$pdf->SetTitle('TWILLES ORDER NUMBER '.$order->order_code);

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
		$pdf->SetMargins(4, 25, 4, 0);//PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		$pdf->SetHeaderMargin(3);//PDF_MARGIN_HEADER);
		$pdf->SetFooterMargin(0);//PDF_MARGIN_FOOTER);

		//set auto page breaks
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		//$pdf->SetAutoPageBreak(FALSE, 1);

		//set image scale factor
		//$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

		//set some language-dependent strings
		$pdf->setLanguageArray('thai');

		// ---------------------------------------------------------

		// add a page
		$pdf->AddPage();

		// ---- START PDF CONTENT
		// ***** USER INFO *****
		$pdf->SetFont('angsanaupc', 'B', 17);
$tbl = '<table cellspacing="0" cellpadding="3" border="0">
	<tr>
		<td width="20"></td>
		<td colspan="3">วันกำหนดเสร็จ  '.$order->order_completed_date.'</td>
	</tr>
    <tr>
        <td rowspan="4" width="20"></td>
        <td width="305">'.$order->delivery_name.'
			<br />
			'.$order->delivery_address1.'
			<br />
			'.$order->delivery_address2.'
			<br />
			'.$order->delivery_country_name.' '.$order->delivery_zipcode.'
        </td>
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


		function ColoredTable($_pdf, $header, $order, $data) {

			// Colors, line width and bold font
			$_pdf->SetFillColor(85, 85, 85);
			$_pdf->SetTextColor(255);
			$_pdf->SetDrawColor(0, 0, 0);
			$_pdf->SetLineWidth(0.3);
			$_pdf->SetFont('', 'B');
			// Header
			$w = array(20, 87, 25, 30, 40);
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

			$all_width = array_sum(array($w[0],$w[1],$w[2],$w[3]));
			// SUM
			$_pdf->Cell($all_width, 6, 'ราคารวม', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[4], 6, number_format($order->net), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			// VAT
			$_pdf->Cell($all_width, 6, 'ภาษี', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[4], 6, number_format($order->vat), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			// DELIVERY
			$_pdf->Cell($all_width, 6, 'ค่าจัดส่ง', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[4], 6, number_format($order->delivery_cost), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			// total
			$_pdf->Cell($all_width, 6, 'ราคาสุทธิ', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[4], 6, number_format($order->total), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			//$_pdf->Cell(array_sum($w), 0, '', 'T');
		}

		$pdf->SetFont('angsanaupc', '', 15);

		// prepare item data
		$item_data = array();
		for($i=0;$i<count($order_item);$i++){
			$item = $order_item[$i];
			array_push($item_data, array(
				$i+1,
				$item->fabric_body_id,
				$item->item_amount,
				$item->item_price,
				$item->item_price + $item->item_amount
			));
		}

		ColoredTable($pdf, array('รายการที่', 'ผ้าตัว','จำนวน','ราคา','รวม'), $order, $item_data
		/*	array(
				array('1','A1',4,6000,24000),
				array('2','B2',3,5000,15000)
		)*/);

		// ****** LOOP ITEMS EACH PAGE
		foreach($order_item AS $item){
			// add a page
			$pdf->AddPage();

			$pdf->SetFont('angsanaupc', '', 14);
/*
			$pdf->Cell(30, 6, 'สัดส่วน', 'LRTB', 0, 'C', 1);
			$pdf->Cell(50, 6, 'Slim Fit', 'LRTB', 0, 'C', 1);
			$pdf->Ln();

			$pdf->Cell(30, 6, 'สัดส่วน', 'LRTB', 0, 'C', 0);
			$pdf->Cell(50, 6, 'Slim Fit', 'LRTB', 0, 'C', 0);

			$pdf->MultiCell(50, 40, 'Slim Fit
			xxx
			xxxx
			xxx', 'LRTB', 0, 'C', 1);

			$pdf->Ln();
*/
//$pdf->Image(base_url('images/temp/body.png'), 80, 50, 50, '', '');
//$pdf->Text(80, 48, 'เย็บธรรมดา');

			$tbl =
'<table cellspacing="0" cellpadding="2" border="1">
	<tr>
		<td width="80" style="background-color:#CCCCCC;"><b>สัดส่วน</b></td>
		<td width="490" style="background-color:#CCCCCC;" colspan="2"><b>Slim Fit</b></td>
    </tr>
	<tr>
		<td width="80">รอบคอ</td>
		<td width="110">'.number_format($item->collar).'</td>
		<td width="380" rowspan="19">
			<table cellspacing="0" cellpadding="2" border="1">
				<tr>
					<td></td>
					<td>
						<strong>ปกเล็ก</strong>
						<br />ปกธรรมดา
						<br />รองสาบ 1 ชั้น
						<br />ไม่มีคอเสียบ
					</td>
					<td></td>
					<td>
						<strong>แบบตัด 1 กระดุม</strong>
						<br />ข้อมือธรรมดา
						<br />หนานุ่ม 2 ชั้น
						<br />2 นิ้ว
					</td>
				</tr>
				<tr>
					<td>
						<strong>ผ้าคอนอก</strong>
						'.$this->get_fabric_html_detail($item->id, $item->fabric_collar_outer_id).'
					</td>
					<td>
						<strong>ผ้าคอใน</strong>
						'.$this->get_fabric_html_detail($item->id, $item->fabric_collar_inner_id).'
					</td>
					<td>
						<strong>ผ้าข้อมือนอก</strong>
						'.$this->get_fabric_html_detail($item->id, $item->fabric_cuff_outer_id).'
					</td>
					<td>
						<strong>ผ้าข้อมือใน</strong>
						'.$this->get_fabric_html_detail($item->id, $item->fabric_cuff_inner_id).'
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<strong>สาปนอก</strong>
						<br />1 นิ้ว
						<br />กระเป๋า 1 ตัด
						<br />รังดุมเม็ดสุดท้าย
						<br />เย็บขวาง
					</td>
					<td colspan="2" rowspan="2">
					</td>
				</tr>
				<tr>
					<td>
						<strong>ผ้าตัว</strong>
						'.$this->get_fabric_html_detail($item->id, $item->fabric_body_id).'
					</td>
					<td>
						<strong>ผ้าสาบใน</strong>
						'.$this->get_fabric_html_detail($item->id, $item->fabric_placket_id).'
					</td>
				</tr>
			</table>
		</td>
    </tr>
	<tr>
		<td>ไหล่</td>
		<td>'.number_format($item->collar).'</td>
    </tr>
	<tr>
		<td>อก</td>
		<td>'.number_format($item->chest).'</td>
    </tr>
	<tr>
		<td>บ่าหน้า</td>
		<td>'.number_format($item->chest_front).'</td>
    </tr>
	<tr>
		<td>บ่าหลัง</td>
		<td>'.number_format($item->chest_back).'</td>
    </tr>
	<tr>
		<td>เอว</td>
		<td>'.number_format($item->waist).'</td>
    </tr>
	<tr>
		<td>สะโพก</td>
		<td>'.number_format($item->hips).'</td>
    </tr>
	<tr>
		<td>ลำตัว</td>
		<td>'.number_format($item->length_in_front).' x '.number_format($item->length_in_back).'</td>
    </tr>
	<tr>
		<td>ยาวแขนซ้าย</td>
		<td>'.number_format($item->sleeve_left).'</td>
    </tr>
	<tr>
		<td>ยาวแขนขวา</td>
		<td>'.number_format($item->sleeve_right).'</td>
    </tr>
	<tr>
		<td>กล้ามแขน</td>
		<td>'.number_format($item->biceps).'</td>
    </tr>
	<tr>
		<td>ศอก</td>
		<td>'.number_format($item->elbow).'</td>
    </tr>
	<tr>
		<td>ข้อมือ</td>
		<td>'.number_format($item->wrist).'</td>
    </tr>
	<tr>
		<td>วงแขน</td>
		<td>'.number_format($item->armhole).'</td>
    </tr>
	<tr>
		<td>อกสูง</td>
		<td>'.number_format($item->chest_height).'</td>
    </tr>
	<tr>
		<td>อกห่าง</td>
		<td>'.number_format($item->chest_distance).'</td>
    </tr>
	<tr>
		<td>ระดับไหล่</td>
		<td>'.$item->shoulder_level_name.'</td>
    </tr>
	<tr>
		<td>ทรงไหล่</td>
		<td>'.$item->shoulder_shape_name.'</td>
    </tr>
	<tr>
		<td colspan="2">
			<strong>ขาว</strong>
			<br />เย็บเม็ดบนห่างจากกระดุมปก 2.5 นิ้ว
			<br />เย็บมือ
		</td>
    </tr>
</table>';
			$pdf->writeHTML($tbl, true, false, false, false, '');
		}

		//$pdf->Write(0, $txt, '', 0, 'L', true, 0, false, false, 0);
		//$pdf->writeHTML($html, true, false, true, false, '');

		// set javascript
		//$pdf->IncludeJS('print(true);');
		// ---------------------------------------------------------

		//Close and output PDF document
		$pdf->Output($pdf_name.'.pdf', 'I');
	}

	public function merge_image(){

	}

	private function get_image_file_path($type, $name){
		$result = '';
		switch ($source_image_type) {
	        case 'fabric':
	            $result = FCPATH.'images/fabric/'.$source_image_path;
	            break;
	        case 'part':
	            $result = FCPATH.'images/fabric/'.$source_image_path;
	            break;
			default: '';
	    }
	    return $result;
	}

	private function get_fabric_html_detail($item_id, $fabric_id){
		// source file path
		$source_path = FCPATH."images/fabric/$fabric_id.jpg";
		$dest_file_name = "$item_id-$fabric_id";
		$dest_path = FCPATH."images/temp/fabric/$dest_file_name.jpg";

		// fabric not set
		if(empty($fabric_id))
			return '<br />-';

		// source file not found
		if(!file_exists($source_path))
			return '<br />'.$fabric_id;

		// dest file not found (not yet resized)
		if(!file_exists($dest_path))
			$this->resize_image($source_path, $dest_path);

		return '<br />'.$fabric_id.'
			<br /><img src="'.(base_url("images/temp/fabric/$dest_file_name.jpg")).'" width="80" />';
	}

	private function get_image_cache_path($type, $name){
		$result = '';
		switch ($source_image_type) {
	        case 'fabric':
	            $result = FCPATH.'images/fabric/'.$source_image_path;
	            break;
	        case 'part':
	            $result = FCPATH.'images/fabric/'.$source_image_path;
	            break;
			default: '';
	    }
	    return $result;
	}

	private function resize_image($source_image_path, $thumbnail_image_path, $max_width = 80, $max_height = 80){
		//$THUMBNAIL_IMAGE_MAX_WIDTH =
		//define('THUMBNAIL_IMAGE_MAX_HEIGHT', 80);

		//echo $source_image_path;
		//return;

		list($source_image_width, $source_image_height, $source_image_type) = getimagesize($source_image_path);
	    switch ($source_image_type) {
	        case IMAGETYPE_GIF:
	            $source_gd_image = imagecreatefromgif($source_image_path);
	            break;
	        case IMAGETYPE_JPEG:
	            $source_gd_image = imagecreatefromjpeg($source_image_path);
	            break;
	        case IMAGETYPE_PNG:
	            $source_gd_image = imagecreatefrompng($source_image_path);
	            break;
	    }
	    if ($source_gd_image === false) {
	        return false;
	    }
	    $source_aspect_ratio = $source_image_width / $source_image_height;
	    $thumbnail_aspect_ratio = $max_width / $max_height;
	    if ($source_image_width <= $max_width && $source_image_height <= $max_height) {
	        $thumbnail_image_width = $source_image_width;
	        $thumbnail_image_height = $source_image_height;
	    } elseif ($thumbnail_aspect_ratio > $source_aspect_ratio) {
	        $thumbnail_image_width = (int) ($max_height * $source_aspect_ratio);
	        $thumbnail_image_height = $max_height;
	    } else {
	        $thumbnail_image_width = $max_width;
	        $thumbnail_image_height = (int) ($max_width / $source_aspect_ratio);
	    }
	    $thumbnail_gd_image = imagecreatetruecolor($thumbnail_image_width, $thumbnail_image_height);
	    imagecopyresampled($thumbnail_gd_image, $source_gd_image, 0, 0, 0, 0, $thumbnail_image_width, $thumbnail_image_height, $source_image_width, $source_image_height);
	    imagejpeg($thumbnail_gd_image, $thumbnail_image_path, 85);
	    imagedestroy($source_gd_image);
	    imagedestroy($thumbnail_gd_image);
	    return true;
	}

}