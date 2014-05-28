Ext.define('TCMS.Size.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			modelType: 'size'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

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

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, deleteAct]
		});

		var window = Ext.create('TCMS.Size.Window');

		var grid = Ext.create('TCMS.Size.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, deleteAct],
			validateActions : [addAct, editAct, deleteAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add size', 'add', grid, {
				type: _this.modelType,
				is_active: 1
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit size', 'edit', grid, {
				id: grid.getSelectedId(),
				type: _this.modelType
			});
		});

		deleteAct.setHandler(function(){
			window.openDialog('Delete size', 'delete', grid, {
				ids: grid.getSelectionsId().join(','),
				type: _this.modelType
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

		window.form.on('afterDelete', function() {
			grid.load();
		});


		grid.load();

		return this.callParent(arguments);
	}
});