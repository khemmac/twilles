Ext.define('BASE.ActionSingle', {
	extend	: 'BASE.Action',
	constructor:function(config) {

		return this.callParent(arguments);
	},
	initComponent : function() {

		return this.callParent(arguments);
	},
	validate : function(source) {
		this.validateSingle(source);
	}
});