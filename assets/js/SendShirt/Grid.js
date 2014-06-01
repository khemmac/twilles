Ext.define('TCMS.SendShirt.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			modelType: 'v_appointment'
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
				{ name:'appointment_type', type:'string' },
				{ name:'appointment_type_name', type:'string' },
				{ name:'full_name', type:'string' },

				{ name:'appointment_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'address_city', type:'string' },
				{ name:'address_state_province', type:'string' },
				{ name:'address_zip', type:'string' },
				{ name:'address_country', type:'int' },
				{ name:'address_country_name', type:'string' },
				{ name:'status', type:'int' },
				{ name:'status_name', type:'string' },
				{ name:'completed_date', type:'string' },

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
			{text: "Type", width:130, dataIndex:'appointment_type', sortable:true, align:'left',
				renderer: function(v,p,r){
					if(v=='PICKUP'){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/block-share.png\') 5px center no-repeat;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pick up your shirt';
					}else if(v=='STYLIST'){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/user-black.png\') 5px center no-repeat;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Request stylist';
					}
				}
			},
			{text: "Full name", width:150, dataIndex:'full_name', sortable:true, align:'left'},
			{text: "Appointment date", width:100, dataIndex:'appointment_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i'):'-'; }
			},
			{text: "Status", width:100, dataIndex:'status', sortable:false, align:'left',
				renderer: function(v,p,r){
					if(v==1){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/exclamation.gif\') 5px center no-repeat; color:red;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+r.get('status_name');
					}else if(v==2){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/tick.gif\') 5px center no-repeat; color:green;';
						return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+r.get('status_name');
					}
				}
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