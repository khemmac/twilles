Ext.define('TCMS.Size.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			height: 360,
			width: 600,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.submitAct = Ext.create('BASE.Action', {
			text: 'Submit'
		});

		this.cancelAct = Ext.create('BASE.Action', {
			text: 'Cancel'
		});

		this.form = Ext.create('TCMS.Size.Form', { region: 'center' });

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		this.items = [this.form];

		this.submitAct.setHandler(function(){
			_this.form.saveData();
			//_this.fireEvent('login_success');
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
			this.form.form.reset();
		},
		"edit" : function() {
			this.form.form.reset();
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
