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