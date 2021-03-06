Ext.define('TCMS.Size.Grid', {
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
					type: 'size'
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'code', type:'string' },
				{ name:'name', type:'string' },
				{ name:'collar', type:'float' },
				{ name:'biceps', type:'float' },
				{ name:'elbow', type:'float' },
				{ name:'wrist', type:'float' },
				{ name:'armhole', type:'float' },

				{ name:'is_active', type:'boolean' },
				{ name:'create_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				'create_by',
				{ name:'update_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				'update_by'
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'DESC'}],
			pageSize: 25
		});

		this.columns = [
			new Ext.grid.RowNumberer(),
			{text: "Code", width:60, dataIndex:'code', sortable:true, align:'left'},
			{text: "Name", width:110, dataIndex:'name', sortable:true, align:'left' },
			{text: "Collar", width:70, dataIndex:'collar', sortable:true, align:'left' },
			{text: "Biceps", width:70, dataIndex:'biceps', sortable:true, align:'left' },
			{text: "Elbow", width:70, dataIndex:'elbow', sortable:true, align:'left' },
			{text: "Wrist", width:70, dataIndex:'wrist', sortable:true, align:'left' },
			{text: "Armhole", width:70, dataIndex:'armhole', sortable:true, align:'left' },

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