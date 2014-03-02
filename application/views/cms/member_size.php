<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.MemberSize.Main', {
			region: 'center',
			title: 'Member size'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>