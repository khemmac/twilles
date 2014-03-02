Ext.define('TCMS.MemberSize.Member.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 440,
			width: 600,
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

		this.submitAct = Ext.create('BASE.ActionSingle', {
			text: 'Select'
		});

		this.cancelAct = Ext.create('BASE.Action', {
			text: 'Cancel'
		});

		this.grid = Ext.create('TCMS.MemberSize.Member.Grid', {
			region: 'center',
			border: true,
			validateActions : [this.submitAct]
		});

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		this.items = [this.grid];

		this.on("show", function() {
			_this.actions[_this.dialogAction].call(_this);
		});

		this.cancelAct.setHandler(function(){
			_this.hide();
		});

		return this.callParent(arguments);
	},
	actions : {
		"search" : function() {
			this.grid.load();
		}
	}
});
