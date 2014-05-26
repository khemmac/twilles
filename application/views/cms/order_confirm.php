<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.OrderConfirm.Main', {
			region: 'center',
			title: 'Order confirm'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>