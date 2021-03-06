Ext.define('TCMS.Fabric.Transaction.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			height: 200,
			width: 350,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: {
				labelWidth: 100,
				labelAlign: 'right',
				width: 300
			},
			items: [{
				name: 'transaction_date',
				xtype: 'datefield',
				fieldLabel: 'Log date',
				allowBlank: false,
				value: new Date(),
				format:'d/m/Y',
				altFormats:'Y-m-d|Y-m-d H:i:s|d/m/Y',
				submitFormat:'Y-m-d',
				editable: false
			}, {
				name: 'amount',
				xtype: 'numberfield',
				fieldLabel: 'Amount',
				allowBlank: false
			}, {
				name: 'remark',
				xtype: 'textarea',
				fieldLabel: 'Remark',
				rows: 3,
				allowBlank: true
			}],
			mapping: function(o){
				return o;
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getDeleteUrl: function(){ return __site_url+'backend/dao/delete'; }
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
		}
	}
});
