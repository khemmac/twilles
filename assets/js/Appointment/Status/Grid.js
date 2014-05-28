Ext.define('TCMS.Appointment.Status.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			disablePaging: true
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.selModel = new Ext.selection.RowModel();

		this.store = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+"backend/appointment/LoadStatusList",
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'status'
				},
				simpleSortMode: true,
				extraParams: {
				}
			},
			fields: [
				{ name:'status', type:'int' },
				{ name:'status_name', type:'string' },
				{ name:'status_date', type:'date', dateFormat: 'Y-m-d H:i:s' }
			],
			remoteSort: true,
			sorters: [{property: 'status', direction: 'DESC'}],
			pageSize: 25
		});

		this.columns = [
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
			{text: "Date", width:120, dataIndex:'status_date', sortable:false, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			}
		];

		return this.callParent(arguments);
	}
});