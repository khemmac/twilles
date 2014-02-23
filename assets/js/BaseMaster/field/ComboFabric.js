Ext.define('TCMS.BaseMaster.field.ComboFabric', {
	extend	: 'BASE.ComboAjax',

	proxyUrl: __site_url+'backend/dao/LoadList',
	proxyFields:[ 'id', 'name' ],
	proxyIdProperty: 'id',
	displayField: 'id',
	valueField: 'id',

	// utility params
	partType: null,


	constructor:function(config) {

		Ext.apply(this, {
			proxyExtraParams:{
				type: 'fabric'
			}
		});

		return this.callParent(arguments);
	},

	initComponent : function() {

		return this.callParent(arguments);
	}
});