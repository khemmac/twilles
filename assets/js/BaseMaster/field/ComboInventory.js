Ext.define('TCMS.BaseMaster.field.ComboInventory', {
	extend	: 'BASE.ComboAjax',

	proxyUrl: __site_url+'backend/dao/LoadList',
	proxyFields:[ 'id', 'name' ],
	proxyIdProperty: 'id',
	displayField: 'name_tailor',
	valueField: 'id',

	// utility params
	partType: null,


	constructor:function(config) {

		Ext.apply(this, {
			proxyExtraParams:{
				type: 'inventory',
				filter: Ext.encode({
					inventory_type: config.inventoryType
				})
			}
		});

		return this.callParent(arguments);
	},

	initComponent : function() {

		return this.callParent(arguments);
	}
});