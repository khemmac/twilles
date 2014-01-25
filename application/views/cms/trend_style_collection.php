<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.TrendStyleCollection.Main', {
			region: 'center',
			moduleTitle: 'Trend style collection',
			title: 'Trend style collection'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>