Ext.define('TCMS.Member.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

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
					type: 'part_style'
				}
			},
			fields: [
				{ name:'id', type:'string' },
				{ name:'username', type:'string' },
				{ name:'email', type:'string' },
				'ip_address',
				{ name:'last_login', type:'date', dateFormat: 'Y-m-d H:i:s' },

				{ name:'first_name', type:'string' },
				{ name:'last_name', type:'string' },
				{ name:'phone', type:'string' },
				{ name:'active', type:'boolean' },

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
			{text: "Code", width:110, dataIndex:'id', sortable:true, align:'left'},
			{text: "Type", width:70, dataIndex:'part_type', sortable:true, align:'left',
				renderer: function(v){
					var types = {
						COLLAR	:'Collar',
						CUFF	:'Cuff',
						PLACKET	:'Placket',
						POCKET	:'Pocket',
						BOTTOM	:'Bottom',
						YOKE	:'Yoke',
						PLEAT	:'Pleat'
					};
					return types[v];
				}
			},
			{text: "Name", width:120, dataIndex:'name', sortable:true, align:'left'},
			{text: "Conflict type", width:160, dataIndex:'conflict_type', sortable:true, align:'left'},
			{text: "Create date", width:120, dataIndex:'create_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Create by", width:100, dataIndex:'create_by', sortable:true, align:'left'},
			{text: "Update date", width:120, dataIndex:'update_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Update by", width:100, dataIndex:'update_by', sortable:true, align:'left'}
		];

		this.bbar = {
			xtype: 'pagingtoolbar',
			store: this.store,
			displayInfo: true
		};

		// event
		this.store.on("beforeload", function (store, opts) {
			opts.params = opts.params || {};
			if(opts.params){
				//var formValues = _this.getSearchFormValues();
				//Ext.apply(opts.params, formValues);
			}
	    });

		return this.callParent(arguments);
	}
});