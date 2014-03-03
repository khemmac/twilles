Ext.define('TCMS.Order.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {

		var addAct = Ext.create('BASE.Action', {
			text: 'Add',
			iconCls: 'b-application_add'
		});

		var viewAct = Ext.create('BASE.ActionSingle', {
			text: 'View',
			iconCls: 'b-application_edit'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, viewAct]
		});

		var dialog = Ext.create('TCMS.Order.Window');

		var grid = Ext.create('TCMS.Order.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, viewAct],
			validateActions : [addAct, viewAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			dialog.openDialog('Add order', 'add', grid, {
				type: 'order'
			});
		});

		viewAct.setHandler(function(){
			window.open(__site_url+'backend/order_report/report/'+grid.getSelectedId());

		});

		grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!viewAct.isDisabled())
				viewAct.execute();
		});

		grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		dialog.form.on('afterSave', function() {
			dialog.hide();
			grid.load();
		});

		dialog.form.on('afterSetStatus', function() {
			dialog.hide();
			grid.load();
		});


		grid.load();

		return this.callParent(arguments);
	}
});