<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.FabricType.Main', {
			region: 'center',
			title: 'Fabric type'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});
	});
</script>