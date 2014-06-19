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

		this.selModel = new Ext.selection.RowModel();

		this.store = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+"backend/dao/LoadList",
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				simpleSortMode: true,
				extraParams: {
					type: 'v_order_status_history'
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'status', type:'int' },
				{ name:'status_name', type:'string' },
				{ name:'status_date', type:'date', dateFormat: 'Y-m-d H:i:s' }
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'DESC'}],
			pageSize: 25
		});

		this.columns = [
			{text: "Status", width:140, dataIndex:'status', sortable:false, align:'left',
				renderer: function(v,p,r){
					var setBg = function(img, color){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/'+img+'\') 5px center no-repeat; color:'+color+';';
					};
					var getMsg = function(text){ return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+text; };
					if(v==1){
						setBg('hourglass.png', 'red');
					} else if(v==2){
						setBg('user-worker.png', 'orange');
					} else if(v==3){
						setBg('truck-box.png', '#cccc00');
					} else if(v==4){
						setBg('tick.gif', 'green');
					} else if(v==5){
						setBg('cross.gif', 'grey');
					}
					return !Ext.isEmpty(r.data.status_name)?getMsg(r.data.status_name):'-';
				}
			},
			{text: "Date", width:120, dataIndex:'status_date', sortable:false, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			}
		];

		return this.callParent(arguments);
	}
});