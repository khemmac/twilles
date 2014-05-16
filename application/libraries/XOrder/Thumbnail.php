<?php

require_once(XORDER_ROOT . 'XOrder/Path.php');
require_once(XORDER_ROOT . 'XOrder/Util.php');
require_once(XORDER_ROOT . 'XOrder/Image.php');

class Thumbnail {

	private $pathInstance;
	private $utilInstance;
	private $imageInstance;

	function __construct(){
		$this->path = new Path();
		$this->util = new Util();
		$this->image = new Image();
	}

	public function GenerateHTML($item){

		$html =
'<table cellspacing="0" cellpadding="1" border="1">
	<tr>
		<td width="80" style="background-color:#CCCCCC;"><b>สัดส่วน</b></td>
		<td width="740" style="background-color:#CCCCCC;" colspan="2"><b>Slim Fit</b></td>
    </tr>
	<tr>
		<td width="80">รอบคอ</td>
		<td width="160">'.number_format($item->collar).'</td>
		<td width="580" rowspan="22">
			<table cellspacing="0" cellpadding="2" border="1">
				<tr>
					<td align="center">'.$this->mergeTmbnl('collar', 'getTmbnlImgsCollar', $item).'</td>
					<td>'.$this->getCollarDetail($item).'</td>
					<td align="center">'.$this->mergeTmbnl('cuff', 'getTmbnlImgsCuff', $item).'</td>
					<td>'.$this->getCuffDetail($item).'</td>
				</tr>
				<tr>
					<td align="center">
						<strong>ผ้าคอนอก</strong>
						'.$this->getFabricHtmlDetail($item, 'fabric_collar_outer_id').'
					</td>
					<td align="center">
						<strong>ผ้าคอใน</strong>
						'.$this->getFabricHtmlDetail($item, 'fabric_collar_inner_id').'
					</td>
					<td align="center">
						<strong>ผ้าข้อมือนอก</strong>
						'.$this->getFabricHtmlDetail($item, 'fabric_cuff_outer_id').'
					</td>
					<td align="center">
						<strong>ผ้าข้อมือใน</strong>
						'.$this->getFabricHtmlDetail($item, 'fabric_cuff_inner_id').'
					</td>
				</tr>
				<tr>
					<td colspan="2" style="color:red;" align="center">
						<strong>'.($item->stitching_type==1?'เย็บริม':'เย็บธรรมดา').'</strong></td>
					<td colspan="2" style="color:red;" align="center">
						<strong>'.($item->stitching_type==1?'เย็บริม':'เย็บธรรมดา').'</strong></td>
				</tr>
				<tr>'.
//					<td>'.$this->merge_body($item).'</td>
					'<td align="center">'.$this->mergeTmbnl('teb', 'getTmbnlImgsBody', $item).'</td>
					<td>'.$this->getBodyDetail($item).'
						<font color="red">
						รังดุมเม็ดสุดท้าย
						เย็บขวาง
						</font>
					</td>
					<td colspan="2" rowspan="2">
						<table cellspacing="0" cellpadding="2" border="0" width="100%">
							<tr><td align="center">'
								.$this->mergeTmbnl('back', 'getTmbnlImgsBack', $item)
								.'<br />'
								.$item->part_pleat_code
							.'</td><td align="center">'
								.$this->mergeTmbnl('yoke', 'getTmbnlImgsYoke', $item)
								.'<br />'
								.$item->part_yoke_code
							.'</td></tr>
							<tr><td align="center">'
								.$this->mergeTmbnl('bottom', 'getTmbnlImgsBottom', $item)
								.'<br />'
								.$item->part_bottom_code
							.'</td><td>'
							.'</td></tr>
						</table>
					</td>
				</tr>
				<tr>
					<td align="center">
						<strong>ผ้าตัว</strong>
						'.$this->getFabricHtmlDetail($item, 'fabric_body_id').'
					</td>
					<td align="center">
						<strong>ผ้าสาบใน</strong>
						'.$this->getFabricHtmlDetail($item, 'fabric_placket_id').'
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
	<tr>
		<td colspan="2" style="background-color:#cccccc;">
			<strong>อื่นๆ</strong>
		</td>
    </tr>
	<tr>
		<td colspan="2">'.nl2br($item->detail).'</td>
    </tr>
	<tr>
		<td colspan="2">Package : '.((empty($item->inventory_package_name))?'-':$item->inventory_package_name).'</td>
    </tr>
</table>';
		return $html;

	}

	private function mergeTmbnl($partPrefix, $getImgsFunc, $item){

		$destPath = $this->path->getThumbnailsOutputPath(array(
			$item->id, $partPrefix, $this->util->getDateStr($item).'.jpg'
		));

		$imgs = call_user_func(array($this, $getImgsFunc), $item);
		//print_r($imgs);
		//echo '<br>'.PHP_EOL;

		$out = $this->image->merge($imgs);
		$this->image->save($out, $destPath);
		//echo($destPath);
		//echo '<br>'.PHP_EOL;
		$imgTag = $this->path->getThumbnailImageTag($destPath);

		//print_r($imgTag);
		//echo '<br><br>'.PHP_EOL;
		return $imgTag;
	}

	private function getTmbnlImgsCollar($item){
		$imgs = array();
		// base img
		array_push($imgs, $this->path->getThumbnailsPath(array(
			'collar',
			$item->part_collar_code.'.png'
		)));

		if(!empty($item->inventory_button_id))
			array_push($imgs, $this->path->getThumbnailsPath(array(
				'button-2',
				$item->inventory_button_id.'.png'
			)));
		return $imgs;
	}

	private function getTmbnlImgsCuff($item){
		$imgs = array();

		$code = $item->part_cuff_code;
		// base img
		array_push($imgs, $this->path->getThumbnailsPath(array(
			'cuff', $code.'.png'
		)));

		if(!empty($item->inventory_button_id)){
			if($code!='french-angled' && $code!='french-rounded' && $code!='french-squared'){
				if($code=='two-buttons-angled' || $code=='two-buttons-rounded')
					array_push($imgs, $this->path->getThumbnailsPath(array(
						'button-3', $item->inventory_button_id.'2step.png'
					)));
				else
					array_push($imgs, $this->path->getThumbnailsPath(array(
						'button-3',
						$item->inventory_button_id.'.png'
					)));
			}
		}
		return $imgs;
	}

	private function getTmbnlImgsBody($item){
		$imgs = array();

		$code = $item->part_placket_code;
		// base img
		if($item->part_placket_code=='tuxedo'){
			array_push($imgs, $this->path->getThumbnailsPath(array('teb', 'standard.png')));
			array_push($imgs, $this->path->getThumbnailsPath(array('teb', 'tuxedo.png')));
		}else
			array_push($imgs, $this->path->getThumbnailsPath(array('teb', $code.'.png')));

		$btn_id = $item->inventory_button_id;
		if(!empty($btn_id)){
			if($code!='concealed')
				array_push($imgs, $this->path->getThumbnailsPath(array('button-body', $btn_id.'.png')));
		}

		// need to get collar imgs on top
		$imgsCollar = array();//$this->getTmbnlImgsCollar($item);
		return array_merge($imgs, $imgsCollar);
	}

	private function getTmbnlImgsBack($item){
		$imgs = array();

		$code = $item->part_pleat_code;
		array_push($imgs, $this->path->getThumbnailsPath(array('back', $code.'.png')));

		return $imgs;
	}

	private function getTmbnlImgsYoke($item){
		$imgs = array();

		$code = $item->part_yoke_code;
		array_push($imgs, $this->path->getThumbnailsPath(array('yoke', $code.'.png')));

		return $imgs;
	}

	private function getTmbnlImgsBottom($item){
		$imgs = array();

		$code = $item->part_bottom_code;
		array_push($imgs, $this->path->getThumbnailsPath(array('bottom', $code.'.png')));

		return $imgs;
	}

	private function getFabricHtmlDetail($item, $fabric_name_property){
		$_CI =& get_instance();

		$item_id = $item->id;
		$fabric_id = $item->{$fabric_name_property};

		// source file path
		$source_path = $this->path->getFabricPath("$fabric_id.jpg");
		$dest_file_name = "$item_id-$fabric_id";
		$dest_path = $this->path->getFabricOutputPath($dest_file_name);

		// fabric not set
		if(empty($fabric_id))
			return '<br />-';

		// source file not found
		if(!file_exists($source_path))
			return '<br />'.$fabric_id.'
					<br /><img src="'.(base_url("images/image-missing.png")).'" />';

		// dest file not found (not yet resized)
		if(!file_exists($dest_path))
			$this->image->resize($source_path, $dest_path);

		$imgTag = $this->path->getFabricImageTag($dest_path);
		return '<br />'.$fabric_id.'
				<br />'.$imgTag;
	}

	// Detail func
	private function getCollarDetail($o){
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
	private function getCuffDetail($o){
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
	private function getBodyDetail($o){
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

}
