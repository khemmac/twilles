Ext.define('TCMS.Order.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 580,
			width: 900,
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

		this.form = Ext.create('TCMS.Order.Form', {
			region: 'center'
		});

		this.itemPanel = this.form.itemPanel;
		this.gridPanel = this.form.gridPanel;

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		this.items = [this.form/*, this.itemPanel*/];

		this.submitAct.setHandler(function(){
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
			this.form.form.reset();

			this.itemPanel.setDisabled(true);
			// load item grid
			this.gridPanel.grid.load({
				filter: Ext.encode({order_id:-1})
			});
		},
		"edit" : function() {
			this.form.form.reset();
			this.form.loadData();

			this.itemPanel.setDisabled(false);
			// load item grid
			this.gridPanel.grid.load({
				filter: Ext.encode({order_id:this.dialogParams.id})
			});
			// load payment status grid
			this.form.paymentStatusGrid.load({
				filter: Ext.encode({order_id:this.dialogParams.id})
			});
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
