Ext.define('TCMS.Order.Status.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		this.changeStatusAct = Ext.create('BASE.Action', {
			text: 'Change status',
			iconCls: 'b-application_add'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [this.changeStatusAct]
		});

		this.window = Ext.create('TCMS.Order.Status.Window');

		this.grid = Ext.create('TCMS.Order.Status.Grid', {
			region: 'center',
			border: false,
			tbar: [this.changeStatusAct],
			validateActions : [this.changeStatusAct]
		});

		this.items = [this.grid];

		this.grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		return this.callParent(arguments);
	}
});