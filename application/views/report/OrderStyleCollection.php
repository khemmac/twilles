<?php if(!empty($item->photo_style_collection)): ?>
	<img src="<?= base_url('upload_temp/style_collection').'/'.$item->photo_style_collection ?>" width="250" height="250" />
<?php else: ?>
	<img src="<?= base_url('images/image-missing.png') ?>" />
<?php endif; ?>