Ext.define('BASE.Action', {
	extend	: 'Ext.Action',
	constructor:function(config) {

		return this.callParent(arguments);
	},
	initComponent : function() {

		return this.callParent(arguments);
	},
	validateSingle : function(source) {
		this.source = source;
		var s = source.getSelectionsId();
		if (Ext.isArray(s))
			this[(s.length == 1) ? "enable" : "disable"]();
		else
			this[(s != null) ? "enable" : "disable"]();
	},
	validateMultiple : function(source) {
		this.source = source;
		var s = source.getSelectionsId();
		if (Ext.isArray(s))
			this[(s.length > 0) ? "enable" : "disable"]();
		else
			this[(s != null) ? "enable" : "disable"]();
	}
});