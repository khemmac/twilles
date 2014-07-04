Ext.define('TCMS.Fabric.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			border: true,
			moduleType: 'fabric'
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
/*
		var activeAct = Ext.create('BASE.ActionMultiple', {
			text: 'Active',
			iconCls: 'b-flag-green'
		});

		var inActiveAct = Ext.create('BASE.ActionMultiple', {
			text: 'Inactive',
			iconCls: 'b-flag-red'
		});
*/
		var deleteAct = Ext.create('BASE.ActionMultiple', {
			text: 'Delete',
			iconCls: 'b-small-cross'
		});

		var displayAct = Ext.create('BASE.ActionMultiple', {
			text: 'Display',
			iconCls: 'b-small-tick-circle-frame'
		});

		var hideAct = Ext.create('BASE.ActionMultiple', {
			text: 'Hide',
			iconCls: 'b-small-cross-circle-frame'
		});

		var importAct = Ext.create('BASE.Action', {
			text: 'Import',
			iconCls: 'b-import'
		});

		var changePriorityAct = Ext.create('BASE.Action', {
			text: 'Change priority',
			iconCls: 'b-small-record_move'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, deleteAct, '-', displayAct, hideAct, '-', importAct, '-', changePriorityAct]
		});

		var window = Ext.create('TCMS.Fabric.Window');

		var grid = Ext.create('TCMS.Fabric.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, deleteAct, '-', displayAct, hideAct, '-', importAct, '-', changePriorityAct],
			validateActions : [addAct, editAct, deleteAct, displayAct, hideAct, importAct, changePriorityAct]
		});

		// ** IMPORT
		var importWindow = Ext.create('TCMS.Fabric.Import.Window');
		// ** END IMPORT

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add Fabric', 'add', grid, {
				type: _this.moduleType
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit Fabric', 'edit', grid, {
				id: grid.getSelectedId(),
				type: _this.moduleType
			});
		});
/*
		activeAct.setHandler(function(){
			window.openDialog('Active', 'setStatus', grid, {
				ids: grid.getSelectionsId().join(','),
				type: _this.moduleType,
				is_active:1
			});
		});

		inActiveAct.setHandler(function(){
			window.openDialog('Inactive', 'setStatus', grid, {
				ids: grid.getSelectionsId().join(','),
				type: _this.moduleType,
				is_active:0
			});
		});
*/
		deleteAct.setHandler(function(){
			Ext.Msg.show({
				title : "Warning",
				msg : "Do you want to delete item(s) ?",
				icon : Ext.Msg.WARNING,
				buttons : Ext.Msg.YESNO,
				fn : function(bt) {
					if (bt == "yes") {
						window.openDialog('Inactive', 'setStatus', grid, {
							ids: grid.getSelectionsId().join(','),
							type: _this.moduleType,
							is_active:0
						});
					}
				}
			});
		});

		displayAct.setHandler(function(){
			window.openDialog('Display', 'setDisplay', grid, {
				ids: grid.getSelectionsId().join(','),
				display:1
			});
		});

		hideAct.setHandler(function(){
			window.openDialog('Hide', 'setDisplay', grid, {
				ids: grid.getSelectionsId().join(','),
				display:0
			});
		});

		importAct.setHandler(function(){
			importWindow.openDialog('Import fabric', 'add');
		});

		var priorityWindow = Ext.create('TCMS.Fabric.Priority.Window');
		changePriorityAct.setHandler(function(){
			priorityWindow.openDialog('Change fabric priority', 'add');
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

		window.form.on('afterSetDisplay', function() {
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