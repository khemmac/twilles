<table cellspacing="0" cellpadding="2" border="1">
	<tr>
		<td align="center"><?= $inst->mergeTmbnl('collar', 'getTmbnlImgsCollar', $item) ?></td>
		<td><?= $inst->getCollarDetail($item) ?></td>
		<td align="center"><?= $inst->mergeTmbnl('cuff', 'getTmbnlImgsCuff', $item) ?></td>
		<td><?= $inst->getCuffDetail($item) ?></td>
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
			<?php if(!empty($item->photo_style_collection)): ?>
				<img src="<?= base_url('upload_temp/style_collection').'/'.$item->photo_style_collection ?>" width="230" height="346" />
			<?php else: ?>
				<img src="<?= base_url('images/image-missing.png') ?>" />
			<?php endif; ?>
		</td>
	</tr>
	<tr>
		<td align="center" colspan="2" valign="middle">
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
</table>

