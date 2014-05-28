Ext.define('TCMS.Appointment.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			modelType: 'appointment',
			modelVType: 'v_appointment'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		var viewAct = Ext.create('BASE.ActionSingle', {
			text: 'View',
			iconCls: 'b-small-magnifier'
		});

		var deleteAct = Ext.create('BASE.ActionMultiple', {
			text: 'Delete',
			iconCls: 'b-small-cross'
		});

		var window = Ext.create('TCMS.Appointment.Window');

		var contextMenu = new Ext.menu.Menu({
			items: [viewAct, deleteAct, window.completeAct]
		});

		var grid = Ext.create('TCMS.Appointment.Grid', {
			region: 'center',
			border: false,
			tbar: [viewAct, deleteAct, ,'-', window.completeAct],
			validateActions : [viewAct, deleteAct, window.completeAct]
		});

		this.items = [grid];

		// **** BIND HANDLER
		viewAct.setHandler(function(){
			window.openDialog('View appointment', 'edit', grid, {
				id: grid.getSelectedId(),
				type: _this.modelVType
			});
		});

		deleteAct.setHandler(function(){
			window.openDialog('Delete appointment', 'delete', grid, {
				ids: grid.getSelectionsId().join(','),
				type: _this.modelType
			});
		});


		window.completeAct.setHandler(function(){
			window.form.formParams = {
				id: grid.getSelectedId()
			};
			window.form.setComplete();
		});

		// **** EVENT
		grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!viewAct.isDisabled())
				viewAct.execute();
		});

		grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		window.form.on('afterDelete', function(){
			grid.load();
		});

		window.form.on('afterChangeStatus', function(){
			grid.load();

			if(window.isVisible()){
				window.statusGrid.load({
					id: grid.getSelectedId()
				});
			}
		});

		grid.load();

		return this.callParent(arguments);
	}
});