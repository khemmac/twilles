<table cellspacing="0" cellpadding="1" border="1">
	<tr>
		<td width="90" style="background-color:#CCCCCC;"><b>สัดส่วน</b></td>
		<td width="130" style="background-color:#CCCCCC;">
			<b>Slim Fit</b>
			<?= (($measure_type==1)?' - งานวัดจากเสื้อ'
				:(($measure_type==2)?' - งานวัดจากตัว':''))
			?>
		</td>
		<td width="600" rowspan="22">
			<?php
				if(!empty($item->style_collection_type)){
					$code = $item->style_collection_code;
					if($item->style_collection_type==2)
						$CI->load->view('report/OrderStyleCollection', array(
							'measure_type'=>$measure_type,
							'item'=>$item,
							'inst'=>$inst
						));
					else
						$CI->load->view('report/OrderNormal', array(
							'measure_type'=>$measure_type,
							'item'=>$item,
							'inst'=>$inst
						));
				}else
					$CI->load->view('report/OrderNormal', array(
						'measure_type'=>$measure_type,
						'item'=>$item,
						'inst'=>$inst
					));

			?>
			<?= $inst->getInventoryDetail($item) ?>
		</td>
    </tr>
	<tr>
		<td><?= $inst->sizeDetail->collarTitle($item) ?></td>
		<td><?= myNumberFormat($item->collar) ?></td>
    </tr>
	<tr>
		<td>ไหล่</td>
		<td><?= $inst->sizeDetail->shoulder($item) ?></td>
    </tr>
	<tr>
		<td><?= $inst->sizeDetail->chestTitle($item) ?></td>
		<td><?= $inst->sizeDetail->chest($item) ?></td>
    </tr>
	<tr>
		<td>บ่าหน้า</td>
		<td><?= myNumberFormat($item->chest_front) ?></td>
    </tr>
	<tr>
		<td>บ่าหลัง</td>
		<td><?= myNumberFormat($item->chest_back) ?></td>
    </tr>
	<tr>
		<td><?= $inst->sizeDetail->waistTitle($item) ?></td>
		<td><?= $inst->sizeDetail->waist($item) ?></td>
    </tr>
	<tr>
		<td><?= $inst->sizeDetail->hipsTitle($item) ?></td>
		<td><?= $inst->sizeDetail->hips($item) ?></td>
    </tr>
	<tr>
		<td>ลำตัว</td>
		<td><?= $inst->sizeDetail->length($item) ?></td>
    </tr>
	<tr>
		<td>ยาวแขนซ้าย</td>
		<td><?= myNumberFormat($item->sleeve_left) ?></td>
    </tr>
	<tr>
		<td>ยาวแขนขวา</td>
		<td><?= myNumberFormat($item->sleeve_right) ?></td>
    </tr>
	<tr>
		<td>กล้ามแขน</td>
		<td><?= $inst->sizeDetail->biceps($item) ?></td>
    </tr>
	<tr>
		<td>ศอก</td>
		<td><?= $inst->sizeDetail->elbow($item) ?></td>
    </tr>
	<tr>
		<td><?= $inst->sizeDetail->wristTitle($item) ?></td>
		<td><?= myNumberFormat($item->wrist) ?></td>
    </tr>
	<tr>
		<td>วงแขน</td>
		<td><?= $inst->sizeDetail->armhole($item) ?></td>
    </tr>
	<tr>
		<td>อกสูง</td>
		<td><?= myNumberFormat($item->chest_height) ?></td>
    </tr>
	<tr>
		<td>อกห่าง</td>
		<td><?= myNumberFormat($item->chest_distance) ?></td>
    </tr>
	<tr>
		<td>ระดับไหล่</td>
		<td><?= $item->shoulder_level_name ?>&nbsp;&nbsp;&nbsp;&nbsp;<?= $item->shoulder_slope ?></td>
    </tr>
	<tr>
		<td>ทรงไหล่</td>
		<td><?= $item->shoulder_shape_name ?></td>
    </tr>
	<tr>
		<td colspan="2">
			<strong><?= $item->inventory_button_name_tailor ?></strong>
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
		<td colspan="2"><?= nl2br($item->detail) ?></td>
    </tr>
</table>