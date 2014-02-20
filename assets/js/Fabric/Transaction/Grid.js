Ext.define('TCMS.Fabric.Transaction.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			disablePaging: true
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.store = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+"backend/dao/loadlist",
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				simpleSortMode: true,
				extraParams: {
					type: 'fabric_transaction'
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'amount', type:'float' },
				{ name:'transaction_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'remark', type:'string' },

				{ name:'create_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				'create_by',
				{ name:'update_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				'update_by'
			],
			remoteSort: true,
			sorters: [{property: 'transaction_date', direction: 'DESC'}],
			pageSize: 99999
		});

		this.columns = [
			{text: "Date", width:70, dataIndex:'transaction_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y'):'-'; }
			},
			{text: "Amount", width:80, dataIndex:'amount', sortable:true, align:'left'}
		];

		return this.callParent(arguments);
	}
});