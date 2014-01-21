Ext.define('TCMS.Authen.LoginWindow', {
	extend	: 'BASE.Window',
    requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			closeAction: 'hide',
			height: 300,
			minHeight: 300,
			width: 380,
			minWidth: 380,
			resizable: false,
			modal: true,
			layout:'border',
			closable: false,
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.form = Ext.create('TCMS.Authen.LoginForm', {
			region: 'center'
		});

		this.submitAct = new Ext.Action({
			text: 'Login',
			iconCls: 'b-small-key',
			animate: true
		});

		this.buttons = [
			new Ext.button.Button(this.submitAct)
		];

		//this.progress.show();

		this.items = [{
			xtype:'panel',
			region: 'north',
			height: 150,
			border: false,
			html: ['<div style="height:120px;">',
						'<div style="height:120px; background-color:rgba(34, 45, 58, 0.9); text-align:center;">',
							'<img src="'+__base_url+'assets/images/logo/logo.svg" style="width:120px; margin-top:20px;" />',
						'</div>',
					'</div>'].join('')
		},this.form
		];

		this.submitAct.setHandler(function(){
			_this.form.submit(function(err, result){
				if(err)
					Ext.Msg.alert('Failure', err);
				else
					Ext.Msg.alert('Success', result);
			});
			//_this.fireEvent('login_success');
		});

		this.form.on('form_key_enter', function(){
			_this.submitAct.execute();
		});

		this.on('show', function(win){
			setTimeout(function(){
				_this.form.getForm().findField('username').focus();
			}, 200);
		});

		return this.callParent(arguments);
	}
});
