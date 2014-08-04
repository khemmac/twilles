Ext.define('TCMS.Promotion.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			modelType: 'promotion_code'
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
					type: this.modelType
				}
			},
			fields: [
				{ name:'id', type:'string' },
				{ name:'promotion_type', type:'int' },
				{ name:'bought_member_id', type:'int' },
				{ name:'promotion_amount', type:'float' },
				{ name:'never_expire', type:'boolean' },
				{ name:'promotion_valid_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'promotion_expire_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'remark', type:'string' },
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
			{text: "Code", width:100, dataIndex:'id', sortable:true, align:'left'},
			{text: "Type", width:70, dataIndex:'promotion_type', sortable:true, align:'left',
				renderer: function(v){
					var types = {
						1: 'Bulk',
						2: 'Percentage',
						3: 'Voucher'
					};
					return types[v];
				}
			},
			{text: "Amount", width:90, dataIndex:'promotion_amount', sortable:true, align:'left',
				renderer: Ext.util.Format.numberRenderer('0,000.##')
			},
			{text: "Never expire", width:170, dataIndex:'never_expire', sortable:true, align:'left',
				renderer: function(v,p,r){
					if(v){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/tick.gif\') 5px center no-repeat;';
						return '';
					}else{
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/cross.gif\') 5px center no-repeat;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
							+Ext.Date.format(r.get('promotion_valid_date'), 'd/m/Y')
							+' - '
							+Ext.Date.format(r.get('promotion_expire_date'), 'd/m/Y');
					}
				}
			},
			{text: "Create date", width:120, dataIndex:'create_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Create by", width:100, dataIndex:'create_by', sortable:true, align:'left'},
			{text: "Update date", width:120, dataIndex:'update_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Update by", width:100, dataIndex:'update_by', sortable:true, align:'left'}
		];

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