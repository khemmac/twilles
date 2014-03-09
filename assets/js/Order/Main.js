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

		var editAct = Ext.create('BASE.ActionSingle', {
			text: 'Edit',
			iconCls: 'b-application_edit'
		});

		var viewAct = Ext.create('BASE.ActionSingle', {
			text: 'View',
			iconCls: 'b-small-magnifier'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, viewAct]
		});

		var dialog = Ext.create('TCMS.Order.Window');

		var grid = Ext.create('TCMS.Order.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, viewAct],
			validateActions : [addAct, editAct, viewAct]
		});

		this.items = [grid];

		addAct.setHandler(function(){
			dialog.openDialog('Add order', 'add', grid, {});
		});

		editAct.setHandler(function(){
			dialog.openDialog('Edit order', 'edit', grid, {
				id: grid.getSelectedId()
			});
		});

		viewAct.setHandler(function(){
			window.open(__site_url+'backend/order_report/report/'+grid.getSelectedId());

		});

		grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!editAct.isDisabled())
				editAct.execute();
		});

		grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		dialog.form.on('afterSave', function(form, act) {
			dialog.hide();

			var id = act.result.data.id;
			if(id>0){
				grid.store.getById(id);
				dialog.openDialog('Edit order', 'edit', grid, {
					id: id
				});
			}
			grid.load();
		});

		dialog.form.on('afterSetStatus', function() {
			dialog.hide();
			grid.load();
		});


		grid.load();

		// when item saved do reload main grid
		dialog.form.gridPanel.window.form.on('afterSave', function() {
			grid.load();

			// reload money data
		});

		return this.callParent(arguments);
	}
});