Ext.define('TCMS.Order.PaymentStatus.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		this.pendingAct = Ext.create('BASE.Action', {
			text: 'Pending payment',
			iconCls: 'b-application_add'
		});

		this.paidAct = Ext.create('BASE.Action', {
			text: 'Paid',
			iconCls: 'b-application_add'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [this.pendingAct, this.paidAct]
		});

		this.grid = Ext.create('TCMS.Order.PaymentStatus.Grid', {
			region: 'center',
			border: false,
			tbar: [this.pendingAct, this.paidAct],
			validateActions : [this.pendingAct, this.paidAct]
		});

		this.items = [this.grid];

		this.grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		return this.callParent(arguments);
	}
});