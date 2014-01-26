Ext.define('TCMS.Authen.LoginForm', {
	extend	: 'BASE.Form',
	constructor:function(config) {

		Ext.apply(this, {
			border: false,
			bodyStyle : 'padding:5px 0px 5px 0px;',
			waitMsgTarget: true,
			defaults: {
				labelWidth : 100,
				width: 300
			}
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		this.items = [{
			xtype: 'textfield',
			width: 300,
			fieldLabel : 'Username',
			name : "username",
			emptyText: '',
			labelAlign: 'right',
			allowBlank: false,
			listeners : {
				specialkey : function(o, e) {
					if (e.getKey() == e.ENTER)
						_this.fireEvent('form_key_enter');
				}
			}
		},{
			xtype: 'textfield',
			width: 300,
			inputType: 'password',
			fieldLabel : 'Password',
			name : "password",
			emptyText: '',
			labelAlign: 'right',
			allowBlank: false,
			listeners : {
				specialkey : function(o, e) {
					if (e.getKey() == e.ENTER)
						_this.fireEvent('form_key_enter');
				}
			}
		}];


		return this.callParent(arguments);
	},
	submit: function(){
		var _this=this,
			formBasic = this.getForm();
        if (formBasic.isValid()) {
			var progress = Ext.Msg.show({
				msg: 'Processing login, please wait...',
				closable: false,
				draggable: false,
				toFrontOnShow: true,
				progress : true,
				wait:true,
				waitConfig: {
					interval:250,
					animate: true,
					text: 'Loggin in...'
				}
			});
            formBasic.submit({
				clientValidation: true,
				waitMsg: 'Loging in...',
				url: __site_url+'backend/auth/do_login',
				success: function(formBasic, action) {
					_this.fireEvent('login_success', action.result.msg);
					//progress.hide();
				},
				failure: _this.failureAlert
            });
        }
	},
	getValues: function(){
		return this.getForm().getValues();
	},
	reset: function(){
		this.getForm().reset();
	}
});