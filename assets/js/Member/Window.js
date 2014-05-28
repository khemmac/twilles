Ext.define('TCMS.Member.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 350,
			width: 400,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center',
			border: false
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.form = Ext.create('TCMS.Member.Form', {
			region: 'center'
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
			// check form valid
			if(!_this.form.form.isValid()){
				var fields = _this.form.form.getFields();
				console.log(fields);
				for(var i=0;i<fields.items.length;i++){
					var o = fields.items[i];
					if(!o.isValid()){
						_this.form.tabForm.setActiveTab(o.up().id);

						break;
					}
				}
			}

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

		return this.callParent(arguments);
	},
	actions : {
		"add" : function() {
			// set require for password field
			var pwd = this.form.form.findField('password');
			pwd.allowBlank = false;
			pwd.isValid();
			this.form.tabForm.setActiveTab(0);

			this.form.reset();
		},
		"edit" : function() {
			// un set require for password field
			var pwd = this.form.form.findField('password');
			pwd.allowBlank = true;
			pwd.isValid();
			this.form.tabForm.setActiveTab(0);

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
