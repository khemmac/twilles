Ext.define('TCMS.Member.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 320,
			width: 400,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'inventory'
		});

		this.comboRole = Ext.create('BASE.ComboStatic', {
			fieldLabel:'User type',
			name : 'group',
			store:[
				[1, 'Admin'],
				[2, 'Member']
			]
		});

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: {
				labelWidth: 100,
				labelAlign: 'right',
				width: 300
			},
			items: [this.comboRole,{
				name: 'username',
				xtype: 'textfield',
				fieldLabel: 'Username',
				allowBlank: false,
				maxLength: 100
			}, {
				name: 'password',
				xtype: 'textfield',
				fieldLabel: 'Password',
				allowBlank: true
			}, {
				name: 'email',
				xtype: 'textfield',
				fieldLabel: 'Email',
				allowBlank: false
			}, {
				name: 'first_name',
				xtype: 'textfield',
				fieldLabel: 'First name',
				allowBlank: false
			}, {
				name: 'last_name',
				xtype: 'textfield',
				fieldLabel: 'Last name',
				allowBlank: false
			}, {
				name: 'phone',
				xtype: 'textfield',
				fieldLabel: 'Phone',
				allowBlank: true,
				maxLength: 20
			}, {
				name: 'last_login',
				xtype: 'displayfield',
				fieldLabel: 'Last login',
				renderer: function(v){
					if(v){
						var d = new Date(v*1000);
						return Ext.Date.format(d, 'j M Y H:i:s');
					}else
						return '-';
				}
			}, {
				name: 'active',
				xtype: 'checkboxfield',
				fieldLabel: 'Active',
				checked: !0
			}],
			plugins: [uxFormStatus],
			mapping: function(o){
				o.active = (o.active && o.active=='on')?1:0;
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/member/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/member/load'; },
			reset: function(){
				_this.comboRole.setDisabled(false);

				this.form.reset();
			}
		});

		this.submitAct = Ext.create('BASE.Action', {
			text: 'Submit'
		});

		this.cancelAct = Ext.create('BASE.Action', {
			text: 'Cancel'
		});

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		//this.progress.show();

		this.items = [this.form];

		this.submitAct.setHandler(function(){
			// check password
			var passField = _this.form.form.findField('password'),
				passValue = passField.getValue();
			if(_this.dialogAction=='edit' && !Ext.isEmpty(passValue)){
				Ext.Msg.show({
					title : 'Password changed.',
					msg : 'Are you sure you want to change password for this user?',
					icon : Ext.Msg.WARNING,
					buttons : Ext.Msg.OKCANCEL,
					fn: function(buttonId){
						if(buttonId=='ok')
							_this.form.saveData();
					}
				});
			}else
				_this.form.saveData();
		});

		this.cancelAct.setHandler(function(){
			_this.hide();
		});

		this.form.on('form_key_enter', function(){
			_this.submitAct.execute();
		});

		this.on("show", function() {
			_this.form.getEl().scrollTo('top',0,false);
			_this.form.formParams = _this.dialogParams;
			_this.form.formAction = _this.dialogAction;
			_this.actions[_this.dialogAction].call(_this);
		});


/*
	    this.comboPartType.on('change', function(){
	    	_this.comboConflictType.reset();
	    	_this.comboConflictType.store.load();
	    });
*/
		this.form.on('afterLoad', function(form, act){
			var data = act.result.data;

			_this.comboRole.setDisabled(false);

			if(data.id==1){
				_this.comboRole.setDisabled(true);
			}
		});

		return this.callParent(arguments);
	},
	actions : {
		"add" : function() {
			this.form.reset();
		},
		"edit" : function() {
			this.form.reset();
			this.form.loadData();
		},
		"delete" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.deleteData();
			});
		},
		"setStatus" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.setStatus();
			});
		}
	}
});
