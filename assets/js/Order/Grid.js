Ext.define('TCMS.Order.Grid', {
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
					type: 'v_order'
				}
			},
			fields: [

/*
`tbl_order`.`delivery_name`,
`tbl_order`.`delivery_address1`,
`tbl_order`.`delivery_address2`,
`tbl_order`.`delivery_province`,
`tbl_order`.`delivery_district`,
`tbl_order`.`delivery_zipcode`,
`tbl_order`.`delivery_country_id`,
`tbl_order`.`inventory_packaging_id`,
`tbl_order`.`delivery_code`,
`tbl_order`.`delievery_method`,
`tbl_order`.`PMGWRESP`,
`tbl_order`.`remark`,
`tbl_order`.`create_date`,
`tbl_order`.`create_by`,
`tbl_order`.`update_date`,
`tbl_order`.`update_by`
 */
				{ name:'id', type:'string' },
				{ name:'member_id', type:'int' },
				{ name:'member_fullname', type:'string' },
				{ name:'order_code', type:'string' },
				{ name:'order_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'order_completed_date', type:'date', dateFormat: 'Y-m-d H:i:s' },
				{ name:'net', type:'float' },
				//{ name:'vat', type:'float' },
				{ name:'delivery_cost', type:'float' },
				{ name:'total', type:'float' },
				{ name:'promotion_code', type:'string' },
				{ name:'promotion_event_id', type:'int' },

				{ name:'payment_method', type:'int' },
				{ name:'payment_ref', type:'string' },
				{ name:'payment_status', type:'int' },
				{ name:'payment_status_name', type:'string' },
				{ name:'status', type:'int' },
				{ name:'status_name', type:'string' },

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
			{text: "Order code", width:120, dataIndex:'order_code', sortable:true, align:'left' },
			{text: "Order code", width:180, dataIndex:'member_fullname', sortable:true, align:'left' },
			{text: "Order date", width:80, dataIndex:'order_date', sortable:true, align:'left',
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y'):'-'; }
			},
			{text: "Net", width:70, dataIndex:'net', sortable:true, align:'left',
				renderer: Ext.util.Format.numberRenderer('0,000.##')
			},
			/*{text: "Vat", width:60, dataIndex:'vat', sortable:true, align:'left',
				renderer: Ext.util.Format.numberRenderer('0,000.##')
			},*/
			{text: "Delivery cost", width:90, dataIndex:'delivery_cost', sortable:true, align:'left',
				renderer: Ext.util.Format.numberRenderer('0,000.##')
			},
			{text: "Total", width:70, dataIndex:'total', sortable:true, align:'left',
				renderer: function(v,p,r){
					p.style = 'font-weight:bold;';
					return Ext.util.Format.number(v, '0,000.##');
				}
			},

			{text: "Payment status", width:120, dataIndex:'payment_status', sortable:true, align:'left',
				renderer: function(v,p,r){
					var setBg = function(img, color){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/'+img+'\') 5px center no-repeat; color:'+color+';';
					};
					var getMsg = function(text){ return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+text; };
					if(v==1){
						setBg('hourglass.png', 'red');
					} else if(v==2){
						setBg('tick.gif', 'green');
					}
					return !Ext.isEmpty(r.data.payment_status_name)?getMsg(r.data.payment_status_name):'-';
				}
			},
			{text: "Order status", width:150, dataIndex:'status', sortable:true, align:'left',
				renderer: function(v,p,r){
					var setBg = function(img, color){
						p.style = 'background:transparent url(\''+__base_url+'/assets/images/icons/'+img+'\') 5px center no-repeat; color:'+color+';';
					};
					var getMsg = function(text){ return '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+text; };
					if(v==1){
						setBg('hourglass.png', 'red');
					} else if(v==2){
						setBg('truck-box.png', '#cccc00');
					} else if(v==3){
						setBg('tick.gif', 'green');
					} else if(v==4){
						setBg('cross.gif', 'grey');
					}
					return !Ext.isEmpty(r.data.status_name)?getMsg(r.data.status_name):'-';
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