Ext.define('TCMS.OrderConfirm.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			modelType: 'order_confirm'
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
					type: _this.modelType
				}
			},
			fields: [
				{ name:'id', type:'string' },
				{ name:'full_name', type:'string' },
				{ name:'email', type:'string' },
				{ name:'amount_transfer', type:'int' },
				{ name:'date_of_transfer', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'bank_transferred_to', type:'string' },
				{ name:'phone', type:'string' },
				{ name:'create_date', type:'date', dateFormat: 'Y-m-d H:i:s' }
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'DESC'}],
			pageSize: 25
		});

		this.columns = [
			new Ext.grid.RowNumberer(),
			{text: "Name", width:180, dataIndex:'full_name', sortable:true, align:'left'},
			{text: "Email", width:150, dataIndex:'email', sortable:true, align:'left'},
			{text: "Amount", width:100, dataIndex:'amount_transfer', sortable:true, align:'left',
				renderer: Ext.util.Format.numberRenderer('0,000.##')
			},
			{text: "Transfer date", width:120, dataIndex:'date_of_transfer', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Bank", width:90, dataIndex:'bank_transferred_to', sortable:true, align:'left'},
			{text: "Phone", width:110, dataIndex:'phone', sortable:true, align:'left'},
			{text: "Create date", width:120, dataIndex:'create_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			}
		];

		// event
		this.store.on("beforeload", function (store, opts) {
			opts.params = opts.params || {};
			if(opts.params){
			}
	    });

		return this.callParent(arguments);
	}
});