<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.BaseMaster.Main', {
			region: 'center',
			title: 'Supplier',
			moduleType: 'supplier',
			moduleTitle: 'Supplier'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>