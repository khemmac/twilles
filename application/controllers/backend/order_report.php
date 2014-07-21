<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Order_report extends CI_Controller {

	function __construct(){
        parent::__construct();

		$this->load->model('v_order_model','v_order');
		$this->load->model('v_order_item_model','v_order_item');
		$this->load->library('XOrder');
	}

	private function formatDeliveryPhone($s){
		if(!empty($s)){
			$sArr = explode('|:|', $s);
			if(count($sArr)>2)
				return '+'.implode(' ', $sArr);
			else
				return $s;
		}
		return '';
	}

	public function report(){

		// prepare data
		$order_id = $this->uri->segment(4);
		$order = $this->v_order->get($order_id);

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
		$pdf->SetHeaderData('twilles_logo.png', 25, 'ใบส่งสินค้า บริษัท ทวิลส์ คลับ จำกัด', '8/22 The Heritage ชอยสุขุมวิท 8 แขวงคลองเตย เขตคลองเตย กรงเทพมหานคร 10110');
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
		$pdf->AddPage('L');

		// ---- START PDF CONTENT
		// ***** USER INFO *****
		$pdf->SetFont('angsanaupc', 'B', 17);

		//วันกำหนดเสร็จ  '.myDateFormat($order->order_completed_date, 'j F Y').'<br />
$tbl = '
<table cellspacing="0" cellpadding="0" border="0" width="1150">
	<tr>
		<td width="20"></td>
		<td width="350">
			วันที่ส่ง  <br /><br />
			<table cellspacing="0" cellpadding="3" border="1">
			    <tr><td align="center" style="background-color:#eeeeee;">ที่อยู่จัดส่ง</td></tr>
			    <tr>
			        <td>'.$order->delivery_name.'
						<br />
						'.$order->delivery_address_line_1.'
						<br />
						'.$order->delivery_address_line_2.'
						<br />
						'.$order->delivery_country_name.' '.$order->delivery_zip.'
						<br />
						'.$this->formatDeliveryPhone($order->delivery_phone).'
			        </td>
				</tr>
			</table>
		</td>
		<td width="200"></td>
		<td width="230" align="center">
        	<table cellspaceing="0" cellpadding="3" border="1" width="200">
        		<tr><td style="background-color:#eeeeee;">รหัสสั่งซื้อ</td></tr>
        		<tr><td>'.$order->order_code.'</td></tr>
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
			$w = array(20, 80, 80, 25, 30, 40);
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
				$_pdf->Cell($w[2], 6, $row[2], 'LRTB', 0, 'L', $fill);
				$_pdf->Cell($w[3], 6, myNumberFormat($row[3]), 'LRTB', 0, 'R', $fill);
				$_pdf->Cell($w[4], 6, myNumberFormat($row[4]), 'LRTB', 0, 'R', $fill);
				$_pdf->Cell($w[5], 6, myNumberFormat($row[5]), 'LRTB', 0, 'R', $fill);
				$_pdf->Ln();
				$fill=!$fill;
			}
			$_pdf->SetFillColor(220, 220, 220);

			$all_width = array_sum(array($w[0],$w[1],$w[2],$w[3],$w[4]));
			// SUM
			$_pdf->Cell($all_width, 6, 'ราคารวม', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[5], 6, myNumberFormat($order->net), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			// DELIVERY
			$_pdf->Cell($all_width, 6, 'ค่าจัดส่ง', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[5], 6, myNumberFormat($order->delivery_cost), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			// total
			$_pdf->Cell($all_width, 6, 'ราคาสุทธิ', 'LRTB', 0, 'R', 1);
			$_pdf->Cell($w[5], 6, myNumberFormat($order->total), 'LRTB', 0, 'R', 1);
			$_pdf->Ln();

			//$_pdf->Cell(array_sum($w), 0, '', 'T');
		}

		$pdf->SetFont('angsanaupc', '', 15);

		// prepare item data
		$item_data = array();
		for($i=0;$i<count($order_item);$i++){
			$item = $order_item[$i];

			$styleCollection = '';
			if(!empty($item->style_collection_type)){
				$code = $item->style_collection_code;
				if($item->style_collection_type==1)
					$styleCollection = "Base style ($code)";
				else if($item->style_collection_type==2)
					$styleCollection = "Trend style ($code)";
				else
					$styleCollection = '-';
			}else
				$styleCollection = '-';

			array_push($item_data, array(
				$i+1,
				$item->fabric_body_id,
				$styleCollection,
				$item->item_amount,
				$item->item_price,
				$item->item_price * $item->item_amount
			));
		}

		//ColoredTable($pdf, array('รายการที่', 'ผ้าตัว','Style collection','จำนวน','ราคา','รวม'), $order, $item_data);

		// ****** LOOP ITEMS EACH PAGE
		$pdf->resetHeaderTemplate();
		$pdf->SetHeaderData('twilles_logo.png', 22
			, 'ใบส่งสินค้า บริษัท ทวิลส์ คลับ จำกัด'
			  .'                                                '.$order->order_code
			  .'                                                             '.$order->delivery_name
			, '8/22 The Heritage ชอยสุขุมวิท 8 แขวงคลองเตย เขตคลองเตย กรงเทพมหานคร 10110');

		foreach($order_item AS $item){
			// add a page
			$pdf->SetMargins(4, 18, 4, 0);
			//$pdf->SetPrintHeader(false);
			$pdf->AddPage('L');

			$pdf->SetFont('angsanaupc', '', 14);

			$tbl = $this->xorder->getOrderItemHTML($item);

			$pdf->writeHTML($tbl, true, false, false, false, '');

			//break;
		}

		//$pdf->Write(0, $txt, '', 0, 'L', true, 0, false, false, 0);
		//$pdf->writeHTML($html, true, false, true, false, '');

		// set javascript
		//$pdf->IncludeJS('print(true);');
		// ---------------------------------------------------------

		//Close and output PDF document
		$pdf->Output($pdf_name.'.pdf', 'I');
	}

	// *** IMAGE THUMBNAIL
	private function get_thumb_path_file($type, $style){
		$stock_path = $this->config->item('STOCK_PATH');
		//echo $stock_path.'thumbnails/'.$type.'-'.$style.'.png';
		$thumb_path = $stock_path.'thumbnails/'.$type.'-'.$style.'.png';
		return $thumb_path;
	}

	public function show_thumb_photo(){
		$path = $this->input->get('path');
		$this->output
		    ->set_content_type('png')
		    ->set_output(file_get_contents($path));
	}

	public function generate_thumb($type, $style){
		$p = $this->get_thumb_path_file($type, $style);

		$url = site_url('backend/order_report/show_thumb_photo?path='.$p);
		if(!file_exists($p))
			return '<img src="'.(base_url("images/image-missing.png?v=1")).'" />';
		else
			return '<img src="'.$url.'" width="90" />';
	}

	public function merge_body_thumb($oi){
		$list = array();
		// part body
		if($oi->part_placket_code=='seamless')
			array_push($list, $this->get_thumb_path_file('teb', 'seamless'));
		else if($oi->part_placket_code=='seamless')
			array_push($list, $this->get_thumb_path_file('teb', 'concealed'));
		else if($oi->part_placket_code=='tuxedo')
			array_push($list, $this->get_thumb_path_file('teb', 'tuxedo'));
		else
			array_push($list, $this->get_thumb_path_file('teb', 'standard'));

		// pocket
		if(!empty($oi->part_pocket_id))
			array_push($list, $this->get_thumb_path_file('pocket', $oi->part_pocket_code));

		$merged = $this->merge_images($list, 400, 400);
		//foreach($list AS $l){
		//	echo "<img src=\"".preg_replace('/\/home\/user\/data\/www\/php_www/', '', $l)."\" style=\"position:absolute;top:0px;left:0px;\" />";
		//}

		$dt = (!empty($oi->update_date))?$oi->update_date:$oi->create_date;
		$dt = preg_replace('/\s/', '_', $dt);
		$output_path = $this->get_image_cache_path('thumbnails', $this->glue(array($oi->order_id, $oi->id, $dt, "teb.png")));

		print_r($list);
		echo $output_path;

		imagepng($merged, $output_path);
		imagedestroy($merged);
	}

	public function test_merge_body_thumb(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(1);
		$this->merge_body_thumb($oi);
	}

	public function test_library(){
		$id = X::Request('id');
		if(empty($id))
			$id = 1;

		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get($id);

		//print_r($oi);
		//return;

		//$html = $this->xorder_report_item->GetItemHTML($oi);
		//echo $html;

		$html = $this->xorder->getOrderItemHTML($oi);
		echo $html;
	}
	// *** END IMAGE THUMBNAIL

	// *** UTIL FOR FIND PATH
	private function get_image_file_path($type, $name){
		$result = '';
		$stock_path = $this->config->item('STOCK_PATH');
		switch ($type) {
	        case 'fabric':
	            $result = $stock_path.'fabric/'.$name; break;
	        case 'part-body':
	            $result = $stock_path.'body/'.$name; break;
	        case 'part-collar':
	            $result = $stock_path.'collar/'.$name; break;
	        case 'part-cuff':
	            $result = $stock_path.'cuff/'.$name; break;
	        case 'part-placket':
	            $result = $stock_path.'placket/'.$name; break;
	        case 'part-pleat':
	            $result = $stock_path.'pleat/'.$name; break;
	        case 'part-pocket':
	            $result = $stock_path.'pocket/'.$name; break;
	        case 'part-yoke':
	            $result = $stock_path.'yoke/'.$name; break;
			default: '';
	    }
	    return $result;
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
	        case 'thumbnails':
	            $result = 'images/temp/thumbnails/'.$name;
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
			.'" width="70" />';
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

	private function merge_image($image_1, $image_2, $width=425, $height=640){
		imagealphablending($image_1, true);
		imagesavealpha($image_1, true);
		imagecopy($image_1, $image_2, 0, 0, 0, 0, $width, $height);
		return $image_1;
	}
	private function glue($str_arr){ return implode('-', $str_arr); }

	public function test_output_fn(){
		$this->load->model('v_order_item_model','v_order_item');
		$oi = $this->v_order_item->get(11);
		$this->merge_collar($oi);
		//print_r($oi);
		//return;

		$order_id = 1;
		$order_item_id = 1;
		$create_date = '2014-03-13 10:19:17';
		$update_date = NULL;

		$dt = (!empty($update_date))?$update_date:$create_date;
		$dt = preg_replace('/\s/', '_', $dt);

		$image_code = implode('-', array($order_id, $order_item_id, $dt, "front.jpg"));
		echo $image_code;
		return;

		return $this->get_image_cache_path('part', $this->glue(array($oi->order_id, $oi->id, $dt, "$part.$extension")), $include_FC);
	}

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

	private function merge_images($imgs, $width=425, $height=640){
		$imgs_exist = array();
		// check file exist
		for($i=0;$i<count($imgs);$i++){
			if(file_exists($imgs[$i]))
				array_push($imgs_exist, $imgs[$i]);
		}

		// set base image
		// set background color to white
		$final = imagecreatetruecolor($width, $height);
		$backgroundColor = imagecolorallocate($final, 255, 255, 255);
		imagefill($final, 0, 0, $backgroundColor);

		foreach ($imgs_exist as $index => $src_image_path)
		{
			//list ($x, $y) = indexToCoords($index);
			$part_img = imagecreatefrompng($src_image_path);

			imagecopy($final, $part_img, 0, 0, 0, 0, $width, $height);
			imagedestroy($part_img);
		}
		return $final;
	}

}