Ext.define('TCMS.BaseMaster.menu.PriorityMenu', {
	extend	: 'Ext.menu.Menu',

	constructor:function(config) {

		Ext.apply(this, {
		});

		return this.callParent(arguments);
	},

	initComponent : function() {

		this.moveTopAct = Ext.create('BASE.ActionSingle', {
			text: 'Move top',
			iconCls: 'b-small-record_top'
		});

		this.moveUpAct = Ext.create('BASE.ActionSingle', {
			text: 'Move up',
			iconCls: 'b-small-record_up'
		});

		this.moveDownAct = Ext.create('BASE.ActionSingle', {
			text: 'Move down',
			iconCls: 'b-small-record_down'
		});

		this.moveBottomAct = Ext.create('BASE.ActionSingle', {
			text: 'Move bottom',
			iconCls: 'b-small-record_bottom'
		});

		this.menuButton = Ext.create('Ext.Button', {
			text		: 'Change priority',
			iconCls		: 'b-small-record_move',
			menu		: [
				this.moveTopAct,
				this.moveUpAct,
				this.moveDownAct,
				this.moveBottomAct
			]
		});

		this.items = [
			this.moveTopAct,
			this.moveUpAct,
			this.moveDownAct,
			this.moveBottomAct
		];

		return this.callParent(arguments);
	}
});