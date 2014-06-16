Ext.define('TCMS.Member.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			modelType: 'user'
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

		var activeAct = Ext.create('BASE.ActionSingle', {
			text: 'Active',
			iconCls: 'b-flag-green'
		});

		var inActiveAct = Ext.create('BASE.ActionSingle', {
			text: 'Inactive',
			iconCls: 'b-flag-red'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, '-', activeAct, inActiveAct]
		});

		var window = Ext.create('TCMS.Member.Window');

		var grid = Ext.create('TCMS.Member.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, '-', activeAct, inActiveAct],
			validateActions : [addAct, editAct, activeAct, inActiveAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			window.openDialog('Add member', 'add', grid, {
				type: _this.modelType
			});
		});

		editAct.setHandler(function(){
			window.openDialog('Edit member', 'edit', grid, {
				id: grid.getSelectedId(),
				type: _this.modelType
			});
		});

		activeAct.setHandler(function(){
			window.openDialog('Active', 'setActive', grid, {
				id: grid.getSelectedId(),
				active:1
			});
		});

		inActiveAct.setHandler(function(){
			window.openDialog('Inactive', 'setActive', grid, {
				id: grid.getSelectedId(),
				active:0
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

		window.form.on('afterSetActive', function() {
			window.hide();
			grid.load();
		});


		grid.load();

		return this.callParent(arguments);
	}
});