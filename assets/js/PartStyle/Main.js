Ext.define('TCMS.PartStyle.Main', {
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

		var activeAct = Ext.create('BASE.ActionMultiple', {
			text: 'Active',
			iconCls: 'b-flag-green'
		});

		var inActiveAct = Ext.create('BASE.ActionMultiple', {
			text: 'Inactive',
			iconCls: 'b-flag-red'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, '-', activeAct, inActiveAct]
		});

		var window = Ext.create('TCMS.PartStyle.Window');

		var grid = Ext.create('TCMS.PartStyle.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, '-', activeAct, inActiveAct],
			validateActions : [addAct, editAct, activeAct, inActiveAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add part style', 'add', grid, {
				type: 'part_style'
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit part style', 'edit', grid, {
				id: grid.getSelectedId(),
				type: 'part_style'
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


		grid.load();

		return this.callParent(arguments);
	}
});