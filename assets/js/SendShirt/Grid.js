Ext.define('TCMS.SendShirt.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			modelType: 'v_send_shirt'
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
				{ name:'id', type:'int' },
				{ name:'user_id', type:'id' },
				{ name:'user_full_name', type:'string' },
				{ name:'full_name', type:'string' },

				{ name:'shirt_brand', type:'string' },
				{ name:'shirt_color', type:'string' },
				{ name:'shirt_size', type:'string' },

				{ name:'status', type:'int' },
				{ name:'status_name', type:'string' },
				{ name:'returned_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'completed_date', type:'date', dateFormat: 'Y-m-d H:i:s' },

				{ name:'create_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'create_by', type:'string' },
				{ name:'update_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'update_by', type:'string' }
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'DESC'}],
			pageSize: 25
		});

		this.columns = [
			new Ext.grid.RowNumberer(),
			{text: "Full name", width:150, dataIndex:'full_name', sortable:true, align:'left',
				renderer: function(v,p,r){
					if(Ext.isEmpty(v.trim())){
						return r.get('user_full_name');
					}else
						return v;
				}
			},
			{text: "Brand", width:100, dataIndex:'shirt_brand', sortable:true, align:'left'},
			{text: "Color", width:100, dataIndex:'shirt_color', sortable:true, align:'left'},
			{text: "Size", width:100, dataIndex:'shirt_size', sortable:true, align:'left'},
			{text: "Status", width:100, dataIndex:'status', sortable:false, align:'left',
				renderer: function(v,p,r){
					if(v==1){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/exclamation.gif\') 5px center no-repeat; color:red;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+r.get('status_name');
					}else if(v==2){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/arrow-return-180.png\') 5px center no-repeat; color:#cccc00;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+r.get('status_name');
					}else if(v==3){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/tick.gif\') 5px center no-repeat; color:green;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+r.get('status_name');
					}
				}
			},
			{text: "Returned date", width:100, dataIndex:'returned_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i'):'-'; }
			},
			{text: "Complete date", width:100, dataIndex:'completed_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i'):'-'; }
			},
			{text: "Submit date", width:120, dataIndex:'create_date', sortable:true, align:'left',
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