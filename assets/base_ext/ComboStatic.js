Ext.define('BASE.ComboStatic', {
	extend	: 'Ext.form.field.ComboBox',

	fieldLabel:'Static combo',
	name : 'combo_static',
	editable: false,
	allowBlank : false,
	triggerAction : 'all',
	emptyText: '-- Select --',
    fields: [ 'value', 'text' ],
	store:[['value1', 'text1'], ['value2', 'text2']],
	valueField: 'value',
	displayField: 'text',

	labelWidth: 100,
	labelAlign: 'right',
	width: 300,

	constructor:function(config) {

		return this.callParent(arguments);
	},
	initComponent : function() {

		return this.callParent(arguments);
	}
});