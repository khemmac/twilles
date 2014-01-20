<script type="text/javascript">
	Ext.onReady(function() {

		var loginDialog = Ext.create('TCMS.Authen.LoginWindow');
		loginDialog.show();

		loginDialog.form.on('login_success', function(){
			self.location.href='index';
		});
	});
</script>