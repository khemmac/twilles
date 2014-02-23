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

		var activeAct = Ext.create('BASE.ActionMultiple', {
			text: 'Active',
			iconCls: 'b-flag-green'
		});

		var inActiveAct = Ext.create('BASE.ActionMultiple', {
			text: 'Inactive',
			iconCls: 'b-flag-red'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, viewAct, '-', activeAct, inActiveAct]
		});

		var window = Ext.create('TCMS.Order.Window');

		var grid = Ext.create('TCMS.Order.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, viewAct, '-', activeAct, inActiveAct],
			validateActions : [addAct, viewAct, activeAct, inActiveAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add order', 'add', grid, {
				type: 'order'
			});
		});

		viewAct.setHandler(function(){
			window.openDialog('View order', 'edit', grid, {
				id: grid.getSelectedId(),
				type: 'order'
			});
		});

		activeAct.setHandler(function(){
			window.openDialog('Active', 'setStatus', grid, {
				ids: grid.getSelectionsId().join(','),
				is_active:1
			});
		});

		inActiveAct.setHandler(function(){
			window.openDialog('Inactive', 'setStatus', grid, {
				ids: grid.getSelectionsId().join(','),
				is_active:0
			});
		});

		grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!viewAct.isDisabled())
				viewAct.execute();
		});

		grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		window.form.on('afterSave', function() {
			window.hide();
			grid.load();
		});

		window.form.on('afterSetStatus', function() {
			window.hide();
			grid.load();
		});


		grid.load();

		return this.callParent(arguments);
	}
});