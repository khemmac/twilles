Ext.define('TCMS.BaseMaster.field.ComboPartForOrder', {
	extend	: 'TCMS.BaseMaster.field.ComboPart',

	proxyUrl: __site_url+'backend/dao/LoadList',
	proxyFields:[ 'id', 'code' ],
	proxyIdProperty: 'id',
	displayField: 'code',
	valueField: 'code',


	constructor:function(config) {

		Ext.apply(this, {});

		return this.callParent(arguments);
	},

	initComponent : function() {

		return this.callParent(arguments);
	}
});