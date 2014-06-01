<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.SendShirt.Main', {
			region: 'center',
			title: 'Send shirt'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>