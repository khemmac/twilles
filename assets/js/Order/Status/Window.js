Ext.define('TCMS.Order.Status.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 150,
			width: 270,
			resizable: false,
			modal: true,
			layout:'border',
			border: false,
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

		this.comboStatus = Ext.create('BASE.ComboStatic', {
			labelWidth: 60,
			width: 220,
			fieldLabel:'Status',
			name : 'status',
			allowBlank: false,
			store:[
				['0', 'Pending payment'],
				['1', 'Pending fabric'],
				['2', 'Pending tailor'],
				['3', 'Delivery in progress'],
				['4', 'Completed'],
				['5', 'Cancelled']
			]
		});

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: {
				labelWidth: 60,
				labelAlign: 'right',
				width: 250
			},
			items: [this.comboStatus/*, {
				name: 'remark',
				xtype: 'textarea',
				fieldLabel: 'Alias',
				allowBlank: false
			}*/],
			mapping: function(o){
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
					type: 'color'
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
					type: 'color'
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; }
		});

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		this.items = [this.form];

		this.submitAct.setHandler(function(){
			_this.form.saveData();
		});

		this.cancelAct.setHandler(function(){
			_this.hide();
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
