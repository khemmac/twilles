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
				url: __site_url+"backend/member/loadlist",
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				simpleSortMode: true,
				extraParams: {
					type: 'user'
				}
			},
			fields: [
/*
id,
ip_address,
username,
password,
salt,
email,
activation_code,
forgotten_password_code,
forgotten_password_time,
remember_code,
created_on,
last_login,
active,
first_name,
last_name,
company,
phone,
fid,
account_status,
last_login_date,
create_date,
create_by,
update_date,
update_by
 */
				{ name:'id', type:'int' },
				{ name:'username', type:'string' },
				{ name:'email', type:'string' },
				'ip_address',
				{ name:'last_login', type:'date', convert: function(v,r){ return v?new Date(v*1000):null; } },

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
			{text: "Username", width:90, dataIndex:'username', sortable:true, align:'left', hidden: true },
			{text: "Email", width:250, dataIndex:'email', sortable:true, align:'left'},
			{text: "Name", width:300, dataIndex:'ip_address', sortable:true, align:'left',
				renderer: function(v,p,r){
					return r.data['first_name']+' '+r.data['last_name'];
				}
			},
			{text: "Phone", width:90, dataIndex:'phone', sortable:true, align:'left', hidden:true},
			{text: "IP Address", width:90, dataIndex:'ip_address', sortable:true, align:'left'},
			{text: "Active", width:50, dataIndex:'active', sortable:true, align:'center',
				renderer: function(v,p,r){
					var icns = (v)?'tick':'cross';
					p.style = "background:transparent url('"+__base_url+"assets/images/icons/"+icns+".gif') no-repeat center center";
				}
			},

			{text: "Last login", width:120, dataIndex:'last_login', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
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