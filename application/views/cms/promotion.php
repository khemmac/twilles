<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Promotion.Main', {
			region: 'center',
			title: 'Promotion'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>