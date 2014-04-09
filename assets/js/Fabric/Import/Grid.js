Ext.define('TCMS.Fabric.Import.Grid', {
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
				{ name:'id', type:'string' },
				{ name:'name', type:'string' },
				{ name:'vendor', type:'string' },
				{ name:'vendor_code', type:'string' },
				{ name:'pattern', type:'string' },
				{ name:'primary_color', type:'string' },
				{ name:'secondary_color', type:'string' },
				{ name:'tertiary_color', type:'string' },
				{ name:'true_color', type:'string' },
				{ name:'fabric_type', type:'string' },
				{ name:'wholesale_price', type:'string' },
				{ name:'mid_price', type:'string' },
				{ name:'retail_price', type:'string' },
				{ name:'buy', type:'string' },
				{ name:'stock_count', type:'string' },

				{ name:'texture', type:'string' },
				{ name:'material', type:'string' },
				{ name:'thread_count', type:'string' },
				{ name:'construction', type:'string' },
				{ name:'finishing', type:'string' },

				{ name:'stock_type', type:'string' }
			],
			remoteSort: true,
			sorters: [{property: 'transaction_date', direction: 'DESC'}],
			pageSize: 99999
		});

		this.features = [{
            ftype: 'summary'
        }];

		this.columns = [
			{text: "Fabric code", width:70, dataIndex:'id', sortable:true, align:'left' },
			{text: "Name", width:70, dataIndex:'name', sortable:true, align:'left' },
			{text: "Vendor", width:70, dataIndex:'vendor', sortable:true, align:'left' },
			{text: "Vendor code", width:70, dataIndex:'vendor_code', sortable:true, align:'left' },
			{text: "Pattern", width:70, dataIndex:'pattern', sortable:true, align:'left' },
			{text: "Primary color", width:60, dataIndex:'primary_color', sortable:true, align:'left' },
			{text: "Secondary color", width:60, dataIndex:'secondary_color', sortable:true, align:'left' },
			{text: "Tertiary color", width:60, dataIndex:'tertiary_color', sortable:true, align:'left' },
			{text: "True color", width:60, dataIndex:'true_color', sortable:true, align:'left' },

			{text: "Type", width:60, dataIndex:'fabric_type', sortable:true, align:'left' },
			{text: "Wholesale", width:60, dataIndex:'wholesale_price', sortable:true, align:'left' },
			{text: "Mid", width:60, dataIndex:'mid_price', sortable:true, align:'left' },
			{text: "Retail", width:60, dataIndex:'retail_price', sortable:true, align:'left' },

			{text: "Buy", width:60, dataIndex:'buy', sortable:true, align:'left' },
			{text: "Stock", width:60, dataIndex:'stock', sortable:true, align:'left' },

			{text: "Texture", width:60, dataIndex:'texture', sortable:true, align:'left' },
			{text: "Material", width:60, dataIndex:'material', sortable:true, align:'left' },
			{text: "Thread count", width:60, dataIndex:'thread_count', sortable:true, align:'left' },
			{text: "Construction", width:60, dataIndex:'construction', sortable:true, align:'left' },
			{text: "Finishing", width:60, dataIndex:'finishing', sortable:true, align:'left' },

			{text: "Stock type", width:60, dataIndex:'stock_type', sortable:true, align:'left' }

		];

		return this.callParent(arguments);
	}
});