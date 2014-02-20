Ext.define('TCMS.Fabric.Transaction.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border',
			border: false
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		this.addAct = Ext.create('BASE.Action', {
			text: 'Add',
			iconCls: 'b-application_add'
		});

		this.editAct = Ext.create('BASE.ActionSingle', {
			text: 'Edit',
			iconCls: 'b-application_edit'
		});

		this.deleteAct = Ext.create('BASE.ActionMultiple', {
			text: 'Delete',
			iconCls: 'b-application_delete'
		});

		var actArr = [this.addAct, this.editAct, this.deleteAct];

		var contextMenu = new Ext.menu.Menu({
			items: actArr
		});

		this.window = Ext.create('TCMS.Fabric.Transaction.Window');

		this.grid = Ext.create('TCMS.Fabric.Transaction.Grid', {
			region: 'center',
			tbar: actArr,
			validateActions : actArr
		});

		this.items = [this.grid];

		this.grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!_this.editAct.isDisabled())
				_this.editAct.execute();
		});

		this.grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		this.editAct.setHandler(function(){
			_this.window.openDialog('Edit Fabric log', 'edit', _this.grid, {
				id: _this.grid.getSelectedId(),
				type: 'fabric_transaction'
			});
		});

		this.deleteAct.setHandler(function(){
			_this.window.openDialog(null, 'delete', _this.grid, {
				ids: _this.grid.getSelectionsId().join(','),
				type: 'fabric_transaction'
			});
		});

		return this.callParent(arguments);
	}
});