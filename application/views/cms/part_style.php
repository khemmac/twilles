<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.PartStyle.Main', {
			region: 'center',
			moduleTitle: 'Thread count',
			title: 'Part style'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>