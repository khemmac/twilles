<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.StyleGroup.Main', {
			region: 'center',
			moduleTitle: 'Base style group',
			title: 'Base style group'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>