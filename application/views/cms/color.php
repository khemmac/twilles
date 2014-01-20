<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.BaseMaster.Main', {
			region: 'center',
			title: 'Color',
			moduleType: 'color',
			moduleTitle: 'Color'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>