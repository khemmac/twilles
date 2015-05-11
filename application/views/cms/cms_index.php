<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.CMS_Index.Main', {
			region: 'center',
			title: 'CMS Index'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});
	});
</script>