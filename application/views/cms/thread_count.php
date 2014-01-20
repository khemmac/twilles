<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.BaseMaster.Main', {
			region: 'center',
			moduleType: 'thread_count',
			moduleTitle: 'Thread count',
			title: 'Thread count'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>