Ext.define('TCMS.Fabric.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			border: true
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

		var activeAct = Ext.create('BASE.ActionMultiple', {
			text: 'Active',
			iconCls: 'b-flag-green'
		});

		var inActiveAct = Ext.create('BASE.ActionMultiple', {
			text: 'Inactive',
			iconCls: 'b-flag-red'
		});

		var importAct = Ext.create('BASE.Action', {
			text: 'Import',
			iconCls: 'b-import'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, '-', activeAct, inActiveAct, '-', importAct]
		});

		var window = Ext.create('TCMS.Fabric.Window');

		var grid = Ext.create('TCMS.Fabric.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, '-', activeAct, inActiveAct, '-', importAct],
			validateActions : [addAct, editAct, activeAct, inActiveAct, importAct]
		});

		// ** IMPORT
		var importWindow = Ext.create('TCMS.Fabric.Import.Window');
		// ** END IMPORT

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add Fabric', 'add', grid, {
				type: 'fabric'
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit Fabric', 'edit', grid, {
				id: grid.getSelectedId(),
				type: 'fabric'
			});
		});

		activeAct.setHandler(function(){
			window.openDialog('Active', 'setStatus', grid, {
				ids: grid.getSelectionsId().join(','),
				type: 'fabric',
				is_active:1
			});
		});

		inActiveAct.setHandler(function(){
			window.openDialog('Inactive', 'setStatus', grid, {
				ids: grid.getSelectionsId().join(','),
				type: 'fabric',
				is_active:0
			});
		});

		importAct.setHandler(function(){
			importWindow.openDialog('Import fabric', 'add');
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

		window.form.on('afterSetStatus', function() {
			window.hide();
			grid.load();
		});

		importWindow.on('afterImportSuccess', function(){
			importWindow.hide();
			grid.load();
		});

		window.transactionPanel.grid.on('calculatedSummaryAmount', function(v){
			window.form.form.findField('length_yards').setValue(v);
			grid.load();
		});


		grid.load();

		return this.callParent(arguments);
	}
});