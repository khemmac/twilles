<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Order.Main', {
			region: 'center',
			title: 'Order'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>