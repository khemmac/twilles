<script type="text/javascript">
	Ext.onReady(function() {

		var main = Ext.create('TCMS.Appointment.Main', {
			region: 'center',
			title: 'Appointment'
		});

		////////////////////////////////////////////
		// VIEWPORT
		var viewport = Ext.create('TCMS.MainViewport', {
			items: [main]
		});

	});
</script>