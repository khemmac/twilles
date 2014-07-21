<table cellspacing="0" cellpadding="2" border="1">
	<tr>
		<td align="center"><?= $inst->mergeTmbnl('collar', 'getTmbnlImgsCollar', $item) ?></td>
		<td><?= $inst->getCollarDetail($item) ?></td>
		<td align="center"><?= $inst->mergeTmbnl('cuff', 'getTmbnlImgsCuff', $item) ?></td>
		<td><?= $inst->getCuffDetail($item) ?></td>
	</tr>
	<tr>
		<td align="center">
			<strong>ผ้าคอนอก</strong>
			<?= $inst->getFabricHtmlDetail($item, 'fabric_collar_outer_id') ?>
		</td>
		<td align="center">
			<strong>ผ้าคอใน</strong>
			<?= $inst->getFabricHtmlDetail($item, 'fabric_collar_inner_id') ?>
		</td>
		<td align="center">
			<strong>ผ้าข้อมือนอก</strong>
			<?= $inst->getFabricHtmlDetail($item, 'fabric_cuff_outer_id') ?>
		</td>
		<td align="center">
			<strong>ผ้าข้อมือใน</strong>
			<?= $inst->getFabricHtmlDetail($item, 'fabric_cuff_inner_id') ?>
		</td>
	</tr>
	<tr>
		<td colspan="2" style="color:red;" align="center">
			<strong><?= ($item->stitching_type==1?'เย็บริม':'เย็บธรรมดา') ?></strong></td>
		<td colspan="2" style="color:red;" align="center">
			<strong><?= ($item->stitching_type==1?'เย็บริม':'เย็บธรรมดา') ?></strong></td>
	</tr>
	<tr>
		<td align="center"><?= $inst->mergeTmbnl('teb', 'getTmbnlImgsBody', $item) ?></td>
		<td><?= $inst->getBodyDetail($item) ?>
			<br />
			<font color="red">
			รังดุมเม็ดสุดท้าย
			เย็บขวาง
			</font>
		</td>
		<td colspan="2" rowspan="2" align="center" valign="middle">
			<table cellspacing="0" cellpadding="2" border="0" width="100%">
				<tr>
					<td align="center">
						<?= $inst->mergeTmbnl('back', 'getTmbnlImgsBack', $item) ?>
						<br />
						<?= $item->part_pleat_id ?>
						(<?= $item->part_pleat_name_tailor ?>)
					</td>
					<td align="center">
						<?= $inst->mergeTmbnl('yoke', 'getTmbnlImgsYoke', $item) ?>
						<br />
						<?= $item->part_yoke_id ?>
						(<?= $item->part_yoke_name_tailor ?>)
					</td>
				</tr>
				<tr>
					<td align="center">
						<?= $inst->mergeTmbnl('bottom', 'getTmbnlImgsBottom', $item) ?>
						<br />
						<?= $item->part_bottom_id ?>
						(<?= $item->part_bottom_name_tailor ?>)
					</td>
					<td>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td align="center">
			<strong>ผ้าตัว</strong>
			<?= $inst->getFabricHtmlDetail($item, 'fabric_body_id') ?>
		</td>
		<td align="center">
			<strong>ผ้าสาบใน</strong>
			<?= $inst->getFabricHtmlDetail($item, 'fabric_placket_id') ?>
		</td>
	</tr>
</table>
