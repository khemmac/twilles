<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.User.Main', {
			region: 'center',
			title: 'User'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>