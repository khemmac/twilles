Ext.define('TCMS.Order.Item.Main', {
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

		var editAct = Ext.create('BASE.ActionSingle', {
			text: 'Edit',
			iconCls: 'b-application_edit'
		});

		var deleteAct = Ext.create('BASE.ActionMultiple', {
			text: 'Delete',
			iconCls: 'b-application_delete'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, deleteAct]
		});

		var window = Ext.create('TCMS.Order.Item.Window');

		this.grid = Ext.create('TCMS.Order.Item.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, deleteAct],
			validateActions : [addAct, editAct, deleteAct]
		});

		this.items = [this.grid];

		addAct.setHandler(function(){
			window.openDialog('Add item', 'add', this.grid, {
				type: 'order'
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit item', 'edit', this.grid, {
				id: this.grid.getSelectedId(),
				type: 'order'
			});
		});

		this.grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!editAct.isDisabled())
				editAct.execute();
		});

		this.grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		window.form.on('afterSave', function() {
			window.hide();
			this.grid.load();
		});

		window.form.on('afterSetStatus', function() {
			window.hide();
			this.grid.load();
		});

		return this.callParent(arguments);
	}
});