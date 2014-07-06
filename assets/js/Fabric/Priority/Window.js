Ext.define('TCMS.Fabric.Priority.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			height: 600,
			width: 350,
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

		this.tree = Ext.create('TCMS.BaseMaster.priority.Tree', {
			region: 'center',
			type: 'fabric'
		});

		this.items = this.tree;

		this.buttons = [this.tree.saveAct];

		this.on("show", function() {
			var _action = _this.dialogAction;

			_this.actions[_this.dialogAction].call(_this);
		});

		return this.callParent(arguments);
	},
	actions : {
		"add" : function() {
			this.tree.store.reload();
			//this.form.form.reset();

			//this.tree.store.load();
		}
	}
});
