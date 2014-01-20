Ext.define('TCMS.BaseMaster.field.ComboPart', {
	extend	: 'BASE.ComboAjax',

	proxyUrl: __site_url+'backend/dao/LoadList',
	proxyFields:[ 'id', 'name' ],
	proxyIdProperty: 'id',
	displayField: 'name',
	valueField: 'id',

	// utility params
	partType: null,


	constructor:function(config) {

		Ext.apply(this, {
			proxyExtraParams:{
				type: 'part_style',
				filter: Ext.encode({
					part_type: config.partType
				})
			}
		});

		return this.callParent(arguments);
	},

	initComponent : function() {

		return this.callParent(arguments);
	}
});