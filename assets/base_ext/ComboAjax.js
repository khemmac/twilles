Ext.define('BASE.ComboAjax', {
	extend	: 'Ext.form.field.ComboBox',

	editable: false,
	//forceSelection: true,
	allowBlank : false,
	triggerAction : 'all',
	emptyText: '-- Select --',
	queryMode: 'remote',
	displayField: 'name',
	valueField: 'id',

	labelWidth: 100,
	labelAlign: 'right',
	width: 300,

	proxyUrl: null,
	proxyExtraParams: null,
	proxyIdProperty: null,
	proxyFields: null,
	proxySorters: null,

	constructor:function(config) {

		return this.callParent(arguments);
	},
	initComponent : function() {

		if(!this.store)
			this.store = new Ext.data.JsonStore({
				proxy: {
					type: 'ajax',
					url: this.proxyUrl || __site_url+'backend/dao/loadlist',
					reader: {
						type: 'json',
						root: 'rows',
						idProperty: this.proxyIdProperty||'id'
					},
					simpleSortMode: true,
					extraParams: this.proxyExtraParams
				},
				fields: this.proxyFields||[ 'id', 'name' ],
				remoteSort: true,
				sorters: this.proxySorters||[{property: 'id', direction: 'ASC'}],
				pageSize: 1000
			});

		return this.callParent(arguments);
	}
});