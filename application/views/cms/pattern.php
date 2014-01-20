<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.BaseMaster.Main', {
			region: 'center',
			title: 'Pattern',
			moduleType: 'pattern',
			moduleTitle: 'Pattern'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>