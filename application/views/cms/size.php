<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Size.Main', {
			region: 'center',
			title: 'Size'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>