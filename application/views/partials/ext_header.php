<?php
function endsWith($haystack, $needle)
{
	$length = strlen($needle);
	if ($length == 0) {
		return true;
	}
	return (substr($haystack, -$length) === $needle);
}

$SV = '?v=3.0';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>TWILLES Administrator</title>

	<script type="text/javascript">
		var __base_url = '<?= base_url() ?>',
			__site_url = '<?= endsWith(site_url(), '/')?site_url().'' : site_url().'/' ?>';
	</script>

	<link rel="stylesheet" type="text/css" href="<?= base_url('assets/ext/resources/css/ext-all.css') ?>" />
	<script type="text/javascript" src="<?= base_url('assets/ext/ext-all.js') ?>"></script>
	<!--script type="text/javascript" src="<?= base_url('assets/ext/ux/NumericField.js') ?>"></script-->
	<!-- FOR SWF UPLOAD -->
	<script type="text/javascript" src="<?= base_url('assets/jslib/swfupload/swfupload.js') ?>"></script>

	<?php if(ENVIRONMENT=='production' || ENVIRONMENT=='testing'): ?>
	<script type="text/javascript" src="<?= base_url('assets/jsdeploy/ext-ux.js').$SV ?>"></script>
	<script type="text/javascript" src="<?= base_url('assets/jsdeploy/all-base.js').$SV ?>"></script>
	<script type="text/javascript" src="<?= base_url('assets/jsdeploy/all-js.js').$SV ?>"></script>
	<?php endif; ?>

	<script type="text/javascript">

		<?php if(ENVIRONMENT=='development'): ?>
		Ext.Loader.setConfig({
			enabled: true,
			paths: {
				'Ext.ux': __base_url+'assets/ext/ux',
				'BASE': __base_url+'assets/base_ext',
				'TCMS': __base_url+'assets/js'
			}
		});
		<?php endif; ?>

		Ext.form.field.ComboBox.override({
			setValue: function(v) {
				var _this=this,
					args = arguments;
				//v = (v && v.toString) ? v.toString() : v;
				if(!this.store.isLoaded && this.queryMode == 'remote') {
					this.store.addListener('load', function(store, rs) {
						this.store.isLoaded = true;

						//_this.setValue(v);
					}, this);
					this.store.load();
				} else {
					this.callOverridden(args);
				}
			}
		});
	</script>
	<link rel="stylesheet" type="text/css" href="<?= base_url('assets/css/style.css').$SV ?>" />
</head>
<body>