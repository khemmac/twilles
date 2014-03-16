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
		function get_collar_detail($o){
			$str_arr = array();
			if(empty($o->part_collar_id))
				return '-';

			array_push($str_arr, '<strong>'.$o->part_collar_code.'</strong>');
			if(!empty($o->part_collar_type))
				array_push($str_arr, $o->part_collar_type_name);
			if(!empty($o->part_collar_thickness))
				array_push($str_arr, $o->part_collar_thickness);
			if(!empty($o->part_collar_width) && floatval($o->part_collar_width)>0)
				array_push($str_arr, number_format($o->part_collar_width, 2).' นิ้ว');
			array_push($str_arr, (($o->part_collar_stay==0)?'ไม่':'').'มีคอเสียบ');
			return implode('<br />', $str_arr);
		}
		function get_cuff_detail($o){
			$str_arr = array();
			if(empty($o->part_cuff_id))
				return '-';

			array_push($str_arr, '<strong>'.$o->part_cuff_code.'</strong>');
			if(!empty($o->part_cuff_type))
				array_push($str_arr, $o->part_cuff_type_name);
			if(!empty($o->part_cuff_thickness))
				array_push($str_arr, $o->part_cuff_thickness);
			if(!empty($o->part_cuff_width) && floatval($o->part_cuff_width)>0)
				array_push($str_arr, number_format($o->part_cuff_width, 2).' นิ้ว');
			return implode('<br />', $str_arr);
		}
		function get_body_detail($o){
			$str_arr = array();
			if(empty($o->part_cuff_id))
				return '-';

			array_push($str_arr, '<strong>'.$o->part_placket_code.'</strong>');
			if(!empty($o->part_placket_width) && floatval($o->part_placket_width)>0)
				array_push($str_arr, number_format($o->part_placket_width, 2).' นิ้ว');
			if(!empty($o->part_pocket_code))
				array_push($str_arr, $o->part_pocket_code);
			return implode('<br />', $str_arr);
		}

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
					<td>'.$this->merge_collar($item).'</td>
					<td>'.get_collar_detail($item).'</td>
					<td>'.$this->merge_cuff($item).'</td>
					<td>'.get_cuff_detail($item).'</td>
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
					<td>'.$this->merge_body($item).'</td>
					<td>'.get_body_detail($item).'
						<font color="red">
						รังดุมเม็ดสุดท้าย
						เย็บขวาง
						</font>
					</td>
					<td colspan="2" rowspan="2">
						<table cellspacing="0" cellpadding="2" border="0">
							<tr><td>'.$item->part_pleat_code.''.$this->merge_pleat($item).'</td></tr>
							<tr><td>'.$item->part_yoke_code.''.$this->merge_yoke($item).'</td></tr>
							<tr><td>'.$item->part_bottom_code.'</td></tr>
						</table>
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

	// *** UTIL FOR FIND PATH
	private function get_image_file_path($type, $name, $include_FC = TRUE){
		$result = '';
		switch ($type) {
	        case 'fabric':
	            $result = 'images/fabric/'.$name; break;
	        case 'part-body':
	            $result = 'images/parts/body/'.$name; break;
	        case 'part-collar':
	            $result = 'images/parts/collar/'.$name; break;
	        case 'part-cuff':
	            $result = 'images/parts/cuff/'.$name; break;
	        case 'part-placket':
	            $result = 'images/parts/placket/'.$name; break;
	        case 'part-pleat':
	            $result = 'images/parts/pleat/'.$name; break;
	        case 'part-pocket':
	            $result = 'images/parts/pocket/'.$name; break;
	        case 'part-yoke':
	            $result = 'images/parts/yoke/'.$name; break;
			default: '';
	    }
	    return ($include_FC)?FCPATH.$result:$result;
	}

	private function get_image_cache_path($type, $name, $include_FC = TRUE){
		$result = '';
		switch ($type) {
	        case 'fabric':
	            $result = 'images/temp/fabric/'.$name;
	            break;
	        case 'part':
	            $result = 'images/temp/part_merge/'.$name;
	            break;
			default: '';
	    }
	    return ($include_FC)?FCPATH.$result:$result;
	}
	// END UTIL

	private function get_fabric_html_detail($item_id, $fabric_id){
		// source file path
		$source_path = $this->get_image_file_path('fabric', "$fabric_id.jpg");
		$dest_file_name = "$item_id-$fabric_id";
		$dest_path = $this->get_image_cache_path('fabric', "$dest_file_name.jpg");

		// fabric not set
		if(empty($fabric_id))
			return '<br />-';

		// source file not found
		if(!file_exists($source_path))
			return '<br />'.$fabric_id.'
					<br /><img src="'.(base_url("images/image-missing.png")).'" />';

		// dest file not found (not yet resized)
		if(!file_exists($dest_path))
			$this->resize_image($source_path, $dest_path);

		return '<br />'.$fabric_id.'
			<br /><img src="'.(base_url($this->get_image_cache_path('fabric', "$dest_file_name.jpg", false)))
			.'" width="90" />';
	}

	private function resize_image($source_image_path, $thumbnail_image_path, $max_width = 90, $max_height = 90){
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

	private function merge_image($image_1, $image_2){
		imagealphablending($image_1, true);
		imagesavealpha($image_1, true);
		imagecopy($image_1, $image_2, 0, 0, 0, 0, 425, 640);
		return $image_1;
	}
	private function glue($str_arr){ return implode('-', $str_arr); }

	private function get_ouput_part_path($oi, $part, $extension, $include_FC = TRUE){
		$dt = (!empty($oi->update_date))?$oi->update_date:$oi->create_date;
		$dt = preg_replace('/\s/', '_', $dt);
		return $this->get_image_cache_path('part', $this->glue(array($oi->order_id, $oi->id, $dt, "$part.$extension")), $include_FC);
	}

	public function test_merge_front(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_front($oi);
	}

	private function merge_front($oi){
		$list = array();

		// check body
		$fabric_body = $oi->fabric_body_id;
		$part_body = '';
		// body right hand
		array_push($list, $this->get_image_file_path('part-body',
			$this->glue(array($fabric_body, 'right-hand.png'))));
		// part body
		if($oi->part_placket_code=='seamless')
			array_push($list, $this->get_image_file_path('part-body',
			$this->glue(array($fabric_body, 'body', 'seamless.png'))));
		else
			array_push($list, $this->get_image_file_path('part-body',
				$this->glue(array($fabric_body, 'body', 'standard.png'))));
		// body left hand
		array_push($list, $this->get_image_file_path('part-body',
			$this->glue(array($fabric_body, 'left-hand.png'))));

		// placket
		if(!empty($oi->part_placket_id) && !empty($oi->fabric_placket_id) && $oi->part_placket_code!='seamless')
			array_push($list, $this->get_image_file_path('part-placket',
				$this->glue(array($oi->fabric_placket_id, 'teb', $oi->part_placket_code.'.png'))));

		// collar
		if(!empty($oi->part_collar_id) && !empty($oi->fabric_collar_outer_id)){
			// outer
			array_push($list, $this->get_image_file_path('part-collar',
				$this->glue(array($oi->fabric_collar_outer_id, 'collar', $oi->part_collar_code.'.png'))));
			// inner
			array_push($list, $this->get_image_file_path('part-collar',
				$this->glue(array($oi->fabric_collar_inner_id, 'collar', 'inner.png'))));
		}

		// cuff
		if(!empty($oi->part_cuff_id) && !empty($oi->fabric_cuff_outer_id)){
			// outer
			array_push($list, $this->get_image_file_path('part-cuff',
				$this->glue(array($oi->fabric_cuff_outer_id, 'cuff', $oi->part_cuff_code, 'outer.png'))));
			// inner
			array_push($list, $this->get_image_file_path('part-cuff',
				$this->glue(array($oi->fabric_cuff_inner_id, 'cuff', $oi->part_cuff_code, 'inner.png'))));
		}

		// pocket
		if(!empty($oi->part_pocket_id))
			array_push($list, $this->get_image_file_path('part-pocket',
				$this->glue(array($oi->fabric_body_id, 'pocket', $oi->part_pocket_code.'.png'))));

		$merged = $this->merge_images($list);
		//foreach($list AS $l){
		//	echo "<img src=\"".preg_replace('/\/home\/user\/data\/www\/php_www/', '', $l)."\" style=\"position:absolute;top:0px;left:0px;\" />";
		//}
		$output_path =	$this->get_ouput_part_path($oi, 'front', 'png');

		imagepng($merged, $output_path);
		imagedestroy($merged);
	}

	public function test_merge_collar(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_collar($oi);
	}

	private function merge_collar($oi){
		// get front name
		$source_file = $this->get_ouput_part_path($oi, 'front', 'png');

		if(!file_exists($source_file))
			$this->merge_front($oi);

		$output_path =	$this->get_ouput_part_path($oi, 'collar', 'jpg');
		if(file_exists($output_path))
			return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'collar', 'jpg', FALSE))).'" width="90" />';

		$image_1 = imagecreatefrompng($source_file);

		// set background color to white
		$final = imagecreatetruecolor(120, 160);
		imagecopy($final, $image_1, 0, 0, 148, 67, 120, 160);

		// resize image
		$thumbnail_gd_image = imagecreatetruecolor(90, 120);
	    imagecopyresampled($thumbnail_gd_image, $final, 0, 0, 0, 0, 90, 120, 120, 160);

		imagejpeg($thumbnail_gd_image, $output_path, 85);
		imagedestroy($image_1);
		imagedestroy($thumbnail_gd_image);
		imagedestroy($final);

		return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'collar', 'jpg', FALSE))).'" width="90" />';
	}

	public function test_merge_cuff(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_cuff($oi);
	}

	private function merge_cuff($oi){
		// get front name
		$source_file = $this->get_ouput_part_path($oi, 'front', 'png');

		if(!file_exists($source_file))
			$this->merge_front($oi);

		$output_path =	$this->get_ouput_part_path($oi, 'cuff', 'jpg');
		if(file_exists($output_path))
			return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'cuff', 'jpg', FALSE))).'" width="90" />';

		$image_1 = imagecreatefrompng($source_file);

		// set background color to white
		$final = imagecreatetruecolor(90, 120);
		imagecopy($final, $image_1, 0, 0, 250, 383, 90, 120);

		imagejpeg($final, $output_path, 85);
		imagedestroy($image_1);
		imagedestroy($final);

		return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'cuff', 'jpg', FALSE))).'" width="90" />';
	}

	public function test_merge_body(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_body($oi);
	}

	private function merge_body($oi){
		// get front name
		$source_file = $this->get_ouput_part_path($oi, 'front', 'png');

		if(!file_exists($source_file))
			$this->merge_front($oi);

		$output_path =	$this->get_ouput_part_path($oi, 'body', 'jpg');
		if(file_exists($output_path))
			return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'body', 'jpg', FALSE))).'" width="90" />';

		$image_1 = imagecreatefrompng($source_file);

		// set background color to white
		$final = imagecreatetruecolor(206, 275);
		imagecopy($final, $image_1, 0, 0, 102, 133, 206, 275);

		// resize image
		$thumbnail_gd_image = imagecreatetruecolor(90, 120);
	    imagecopyresampled($thumbnail_gd_image, $final, 0, 0, 0, 0, 90, 120, 206, 275);

		imagejpeg($thumbnail_gd_image, $output_path, 85);
		imagedestroy($image_1);
		imagedestroy($thumbnail_gd_image);
		imagedestroy($final);

		return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'body', 'jpg', FALSE))).'" width="90" />';
	}

	// ----------------------- BACK

	public function test_merge_back(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_back($oi);
	}

	private function merge_back($oi){
		$list = array();
		$fabric_body = $oi->fabric_body_id;

		// pleat (back)
		array_push($list, $this->get_image_file_path('part-pleat',
			$this->glue(array($fabric_body, 'back', $oi->part_pleat_code.'.png'))));

		// yoke
		if(!empty($oi->part_yoke_id))
			array_push($list, $this->get_image_file_path('part-yoke',
				$this->glue(array($fabric_body, 'yoke', $oi->part_yoke_code.'.png'))));

		$merged = $this->merge_images($list);
		foreach($list AS $l){
			echo "<img src=\"".preg_replace('/\/home\/user\/data\/www\/php_www/', '', $l)."\" style=\"position:absolute;top:0px;left:0px;\" />";
		}
		$output_path =	$this->get_ouput_part_path($oi, 'back', 'png');

		imagepng($merged, $output_path);
		imagedestroy($merged);
	}

	public function test_merge_yoke(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_yoke($oi);
	}

	private function merge_yoke($oi){
		// get front name
		$source_file = $this->get_ouput_part_path($oi, 'back', 'png');

		if(!file_exists($source_file))
			$this->merge_front($oi);

		$output_path =	$this->get_ouput_part_path($oi, 'yoke', 'jpg');
		if(file_exists($output_path))
			return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'yoke', 'jpg', FALSE))).'" width="170" />';

		$image_1 = imagecreatefrompng($source_file);

		// set background color to white
		$final = imagecreatetruecolor(271, 191);
		imagecopy($final, $image_1, 0, 0, 98, 106, 271, 143);

		// resize image
		$thumbnail_gd_image = imagecreatetruecolor(170, 90);
	    imagecopyresampled($thumbnail_gd_image, $final, 0, 0, 0, 0, 170, 90, 271, 143);

		imagejpeg($thumbnail_gd_image, $output_path, 85);
		imagedestroy($image_1);
		imagedestroy($thumbnail_gd_image);
		imagedestroy($final);

		return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'yoke', 'jpg', FALSE))).'" width="170" />';
	}

	public function test_merge_pleat(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_pleat($oi);
	}

	private function merge_pleat($oi){
		// get front name
		$source_file = $this->get_ouput_part_path($oi, 'back', 'png');

		if(!file_exists($source_file))
			$this->merge_front($oi);

		$output_path =	$this->get_ouput_part_path($oi, 'pleat', 'jpg');
		if(file_exists($output_path))
			return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'pleat', 'jpg', FALSE))).'" width="170" />';

		$image_1 = imagecreatefrompng($source_file);

		// set background color to white
		$final = imagecreatetruecolor(271, 191);
		imagecopy($final, $image_1, 0, 0, 98, 152, 271, 143);

		// resize image
		$thumbnail_gd_image = imagecreatetruecolor(170, 90);
	    imagecopyresampled($thumbnail_gd_image, $final, 0, 0, 0, 0, 170, 90, 271, 143);

		imagejpeg($thumbnail_gd_image, $output_path, 85);
		imagedestroy($image_1);
		imagedestroy($thumbnail_gd_image);
		imagedestroy($final);

		return '<img src="'.(base_url($this->get_ouput_part_path($oi, 'pleat', 'jpg', FALSE))).'" width="170" />';
	}

	public function test_merge_images(){
		$list = array(
			'/home/user/data/www/php_www/twilles/images/parts/body/GI-19424-right-hand.png',
			'/home/user/data/www/php_www/twilles/images/parts/body/GI-19424-body-standard.png',
			'/home/user/data/www/php_www/twilles/images/parts/body/GI-19424-left-hand.png',
			'/home/user/data/www/php_www/twilles/images/parts/placket/GI-19430-teb-tuxedo.png',
			'/home/user/data/www/php_www/twilles/images/parts/collar/GI-19404-collar-cutaway.png',
			'/home/user/data/www/php_www/twilles/images/parts/collar/GI-19423-collar-inner.png',
			'/home/user/data/www/php_www/twilles/images/parts/cuff/DO-Garnet-cuff-rounded-outer.png',
			'/home/user/data/www/php_www/twilles/images/parts/cuff/GI-19403-cuff-rounded-inner.png',
			'/home/user/data/www/php_www/twilles/images/parts/pocket/GI-656019-pocket-2-rounded.png'
		);
		$merged = $this->merge_images($list);
		foreach($list AS $l){
			echo "<img src=\"".preg_replace('/\/home\/user\/data\/www\/php_www/', '', $l)."\" style=\"position:absolute;top:0px;left:0px;\" />";
		}
		$output_path = '/home/user/data/www/php_www/twilles/images/temp/part_merge/xxxxxxxxxxx.jpg';
		imagejpeg($merged, $output_path, 85);
		imagedestroy($merged);
	}

	public function test_merge_images2(){
		$list = array(
			'/home/user/data/www/php_www/twilles/images/parts/pleat/GI-656113-back-side.png',
			'/home/user/data/www/php_www/twilles/images/parts/yoke/RB-RBS82-yoke-split.png'
		);
		$merged = $this->merge_images($list);
		foreach($list AS $l){
			echo "<img src=\"".preg_replace('/\/home\/user\/data\/www\/php_www/', '', $l)."\" style=\"position:absolute;top:0px;left:0px;\" />";
		}
		$output_path = '/home/user/data/www/php_www/twilles/images/temp/part_merge/yyyyyyy.jpg';
		imagejpeg($merged, $output_path, 85);
		imagedestroy($merged);
	}

	private function merge_images($imgs){
		$imgs_exist = array();
		// check file exist
		for($i=0;$i<count($imgs);$i++){
			if(file_exists($imgs[$i]))
				array_push($imgs_exist, $imgs[$i]);
		}

		// set base image
		// set background color to white
		$final = imagecreatetruecolor(425, 640);
		$backgroundColor = imagecolorallocate($final, 255, 255, 255);
		imagefill($final, 0, 0, $backgroundColor);

		foreach ($imgs_exist as $index => $src_image_path)
		{
			//list ($x, $y) = indexToCoords($index);
			$part_img = imagecreatefrompng($src_image_path);

			imagecopy($final, $part_img, 0, 0, 0, 0, 425, 640);
			imagedestroy($part_img);
		}
		return $final;
	}

}