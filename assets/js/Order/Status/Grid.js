Ext.define('TCMS.Order.Status.Grid', {
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
					type: 'v_order_item'
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'item_price', type:'float' },
				{ name:'item_amount', type:'int' },

				{ name:'create_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				'create_by',
				{ name:'update_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				'update_by'
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'ASC'}],
			pageSize: 25
		});

		this.columns = [
			new Ext.grid.RowNumberer(),
			{text: "Body fabric", width:100, dataIndex:'fabric_body_id', sortable:true, align:'left'},
			{text: "Fabric type", width:130, dataIndex:'fabric_type_name', sortable:true, align:'left',
				renderer: function(v){ return (!Ext.isEmpty(v))?v:'-'; }
			}
		];

		return this.callParent(arguments);
	}
});