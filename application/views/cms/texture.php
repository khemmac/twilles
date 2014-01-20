<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.BaseMaster.Main', {
			region: 'center',
			title: 'Texture',
			moduleType: 'texture',
			moduleTitle: 'Texture'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>