<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Inventory.Main', {
			region: 'center',
			title: 'Inventory'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>