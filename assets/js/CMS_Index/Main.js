Ext.define('TCMS.CMS_Index.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			border: false
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
			iconCls: 'b-small-cross'
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
			items: [addAct, editAct, deleteAct]
		});

		var window = Ext.create('TCMS.CMS_Index.Window');

		var grid = Ext.create('TCMS.CMS_Index.Grid', {
			region: 'center',
			tbar: [addAct, editAct, deleteAct],
			validateActions : [addAct, editAct, deleteAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add', 'add', grid, {});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit', 'edit', grid, {
				id: grid.getSelectedId()
			});
		});

		deleteAct.setHandler(function(){
			window.openDialog(null, 'delete', grid, {
				ids: grid.getSelectionsId().join(',')
			});
		});

		grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!editAct.isDisabled())
				editAct.execute();
		});

		grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		window.form.on('afterSave', function() {
			window.hide();
			grid.load();
		});

		window.form.on('afterDelete', function(){
			grid.load();
		});


		grid.load();

		return this.callParent(arguments);
	}
});