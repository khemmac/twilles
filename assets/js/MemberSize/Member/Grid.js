Ext.define('TCMS.MemberSize.Member.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.selModel = new Ext.selection.RowModel();

		this.store = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+"backend/member/loadlist",
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				simpleSortMode: true,
				extraParams: {
					type: 'user',
					filter: Ext.encode({
						active: 1
					})
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'username', type:'string' },
				{ name:'email', type:'string' },
				{ name:'last_login', type:'date', convert: function(v,r){ return v?new Date(v*1000):null; } },

				{ name:'first_name', type:'string' },
				{ name:'last_name', type:'string' },
				{ name:'phone', type:'string' },
				{ name:'active', type:'boolean' }
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'ASC'}],
			pageSize: 25
		});

		this.columns = [
			{text: "Email", width:150, dataIndex:'email', sortable:true, align:'left'},
			{text: "Name", width:110, dataIndex:'ip_address', sortable:true, align:'left',
				renderer: function(v,p,r){
					return r.data['first_name']+' '+r.data['last_name'];
				}
			},
			{text: "Last login", width:120, dataIndex:'last_login', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			}
		];

		this.bbar = {
			xtype: 'pagingtoolbar',
			store: this.store,
			displayInfo: true
		};

		return this.callParent(arguments);
	}
});