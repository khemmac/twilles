Ext.define('TCMS.Order.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			modelType: 'order'
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

		var viewAct = Ext.create('BASE.ActionSingle', {
			text: 'View',
			iconCls: 'b-small-magnifier'
		});

		var contextMenu = new Ext.menu.Menu({
			items: [addAct, editAct, deleteAct, viewAct]
		});

		var dialog = Ext.create('TCMS.Order.Window');

		var vActions = [
			addAct, editAct, deleteAct, viewAct,
			// payment status action
			dialog.form.paymentStatusPanel.pendingAct,
			dialog.form.paymentStatusPanel.paidAct,
			// order status action
			dialog.form.orderStatusPanel.pendingFabricAct,
			dialog.form.orderStatusPanel.pendingTailorAct,
			dialog.form.orderStatusPanel.deliveryAct,
			dialog.form.orderStatusPanel.completeAct,
			dialog.form.orderStatusPanel.cancelAct
		];

		var grid = Ext.create('TCMS.Order.Grid', {
			region: 'center',
			border: false,
			tbar: [addAct, editAct, deleteAct, viewAct],
			validateActions : vActions
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

		deleteAct.setHandler(function(){
			dialog.openDialog('Delete order', 'delete', grid, {
				ids: grid.getSelectionsId().join(','),
				type: _this.modelType
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

		// after main form save
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

		dialog.form.on('afterDelete', function(){
			grid.load();
		});

		grid.load();

		// order_item event
		// ** after item form save
		dialog.form.gridPanel.window.form.on('afterSave', function() {
			dialog.form.gridPanel.window.hide();
			dialog.form.gridPanel.grid.load({
				filter: Ext.encode({order_id:dialog.dialogParams.id})
			});

			// main grid load
			grid.load();

			// reload money data
			dialog.form.updateTotal();
		});
		// ** after item form delete
		dialog.form.gridPanel.window.form.on('afterDelete', function() {
			dialog.form.gridPanel.grid.load({
				filter: Ext.encode({order_id:dialog.dialogParams.id})
			});

			// main grid load
			grid.load();

			// reload money data
			dialog.form.updateTotal();
		});

		// payment status event
		dialog.form.paymentStatusPanel.form.on('afterChangeStatus', function(form, act){
			//dialog.form.paymentStatusPanel.grid.load();
			dialog.hide();
			grid.load(null, function(g, ids){
				if(!editAct.isDisabled())
					editAct.execute();
			});
		});

		// status event
		dialog.form.orderStatusPanel.form.on('afterChangeStatus', function(form, act){
			//dialog.form.paymentStatusPanel.grid.load();
			dialog.hide();
			grid.load(null, function(g, ids){
				if(!editAct.isDisabled())
					editAct.execute();
			});
		});

		return this.callParent(arguments);
	}
});