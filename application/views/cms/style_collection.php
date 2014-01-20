<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.StyleCollection.Main', {
			region: 'center',
			moduleTitle: 'Style collection',
			title: 'Style collection'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>