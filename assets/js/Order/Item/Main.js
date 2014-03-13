Ext.define('TCMS.Order.Item.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
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

		var contextMenu = new Ext.menu.Menu({
			items: [this.addAct, this.editAct, this.deleteAct]
		});

		this.window = Ext.create('TCMS.Order.Item.Window');

		this.grid = Ext.create('TCMS.Order.Item.Grid', {
			region: 'center',
			border: false,
			tbar: [this.addAct, this.editAct, this.deleteAct],
			validateActions : [this.addAct, this.editAct, this.deleteAct]
		});

		this.items = [this.grid];

		this.deleteAct.setHandler(function(){
			_this.window.openDialog(null, 'delete', _this.grid, {
				ids: _this.grid.getSelectionsId().join(',')
			});
		});

		this.grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!_this.editAct.isDisabled())
				_this.editAct.execute();
		});

		this.grid.on('cellcontextmenu', function(g, td, cellIndex, r, tr, rowIndex, e) {
			e.preventDefault();
			contextMenu.showAt(e.xy);
		});

		return this.callParent(arguments);
	}
});