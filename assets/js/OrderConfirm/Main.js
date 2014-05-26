Ext.define('TCMS.OrderConfirm.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			modelType: 'order_confirm'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		var deleteAct = Ext.create('BASE.ActionMultiple', {
			text: 'Delete',
			iconCls: 'b-small-cross'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [deleteAct]
		});

		var window = Ext.create('TCMS.OrderConfirm.Window');

		var grid = Ext.create('TCMS.OrderConfirm.Grid', {
			region: 'center',
			border: false,
			tbar: [deleteAct],
			validateActions : [deleteAct]
		});

		this.items = [grid];

		deleteAct.setHandler(function(){
			window.openDialog('Delete order confirm', 'delete', grid, {
				ids: grid.getSelectionsId().join(','),
				type: _this.modelType
			});
		});

		grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		window.form.on('afterDelete', function(){
			grid.load();
		});

		grid.load();

		return this.callParent(arguments);
	}
});