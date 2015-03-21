<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Fabric.Main', {
			region: 'center',
			title: 'Fabric'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});
	});
</script>