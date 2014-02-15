<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Member.Main', {
			region: 'center',
			title: 'Member'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>