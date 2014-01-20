Ext.define('BASE.ActionMultiple', {
	extend	: 'BASE.Action',
	constructor:function(config) {

		return this.callParent(arguments);
	},
	initComponent : function() {

		return this.callParent(arguments);
	},
	validate : function(source) {
		this.validateMultiple(source);
	}
});