Ext.define('TCMS.BaseMaster.Main', {
	extend	: 'Ext.panel.Panel',

	moduleType: null,
	moduleTitle: null,

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		var l = this.moduleType.length;

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

		var window = Ext.create('TCMS.BaseMaster.Window', {
			moduleType: this.moduleType
		});

		var grid = Ext.create('TCMS.BaseMaster.Grid', {
			moduleType: this.moduleType,
			region: 'center',
			border: false,
			tbar: [addAct, editAct, '-', activeAct, inActiveAct],
			validateActions : [addAct, editAct, activeAct, inActiveAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add '+_this.moduleTitle, 'add', grid, {
				type: _this.moduleType
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit '+_this.moduleTitle, 'edit', grid, {
				id: grid.getSelectedId(),
				type: _this.moduleType
			});
		});

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