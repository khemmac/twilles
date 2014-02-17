Ext.define('TCMS.Fabric.Grid', {
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
					type: 'v_fabric'
				}
			},
			fields: [
/*
id Varchar(20) NOT NULL COMMENT 'code ผ้า',
	fabric_type Int NOT NULL DEFAULT 1 COMMENT '1=ผ้าธรรมดา  2=ผ้าแพง',
	name Varchar(250) COMMENT 'ชื่อ',
	alias Varchar(250) COMMENT 'ชื่อย่อ',
	supplier_id Int UNSIGNED NOT NULL COMMENT 'supplier ที่ขายผ้า',
	stock_type Tinyint UNSIGNED NOT NULL DEFAULT 1 COMMENT '1=ไม่หมด(running)  2=หมด(finite)',
	primary_color_id Int UNSIGNED COMMENT 'สีหลัก',
	secondary_color_id Int UNSIGNED COMMENT 'สีรองที่สอง',
	tertiary_color_id Int UNSIGNED COMMENT 'สีรองที่สาม',
	true_color_id Int UNSIGNED COMMENT 'สีจริงๆของผ้า',
	pattern_id Int UNSIGNED COMMENT 'ลาย',
	texture_id Int UNSIGNED COMMENT 'วิธีการถัก',
	thread_count Decimal(8,2) UNSIGNED COMMENT 'จำนวนด้าย',
	length_yards Decimal(8,2) NOT NULL DEFAULT 0 COMMENT 'จำนวนผ้าที่เหลือ (หลา)',
	price Decimal(8,2) NOT NULL DEFAULT 0 COMMENT 'ราคาขาย',
	cost Decimal(8,2) NOT NULL DEFAULT 0 COMMENT 'ต้นทุน',
	is_active Tinyint UNSIGNED NOT NULL DEFAULT 1,
	create_date Datetime NOT NULL,
	create_by Varchar(50) NOT NULL,
	update_date Datetime,
	update_by Varchar(50),

*/

				{ name:'id', type:'string' },
				{ name:'fabric_type', type:'int' },
				{ name:'fabric_type_name', type:'string' },
				'name',
				'alias',
				{ name:'supplier_id', type:'int' },
				{ name:'supplier_name', type:'string' },
				{ name:'stock_type', type:'int' },
				{ name:'stock_type_name', type:'string' },

				{ name:'primary_color_id', type:'int' },
				{ name:'primary_color_name', type:'string' },
				{ name:'secondary_color_id', type:'int' },
				{ name:'secondary_color_name', type:'string' },
				{ name:'tertiary_color_id', type:'int' },
				{ name:'tertiary_color_name', type:'string' },
				{ name:'true_color_id', type:'int' },
				{ name:'true_color_name', type:'string' },
				{ name:'pattern_id', type:'int' },
				{ name:'pattern_name', type:'string' },
				{ name:'texture_id', type:'int' },
				{ name:'texture_name', type:'string' },

				{ name:'thread_count_id', type:'int' },
				{ name:'thread_count_name', type:'string' },
				{ name:'length_yards', type:'float' },
				{ name:'price', type:'float' },
				{ name:'cost', type:'float' },

				{ name:'is_active', type:'boolean' },
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

			{text: "Code", width:80, dataIndex:'id', sortable:true, align:'left'},
			{text: "Fabric Type", width:80, dataIndex:'fabric_type_name', sortable:true, align:'left'},
			{text: "Supplier", width:100, dataIndex:'supplier_name', sortable:true, align:'left'},
			{text: "Stock Type", width:80, dataIndex:'stock_type_name', sortable:true, align:'left'},

			{text: "Primary color", width:80, dataIndex:'primary_color_name', sortable:true, align:'left'},
			{text: "Secondary color", width:80, dataIndex:'secondary_color_name', sortable:true, align:'left'},
			{text: "Tertiary color", width:80, dataIndex:'tertiary_color_name', sortable:true, align:'left'},
			{text: "True color", width:80, dataIndex:'true_color_name', sortable:true, align:'left'},

			{text: "Pattern", width:80, dataIndex:'pattern_name', sortable:true, align:'left'},
			{text: "Texture", width:80, dataIndex:'texture_name', sortable:true, align:'left'},
			{text: "Thread count", width:80, dataIndex:'thread_count_name', sortable:true, align:'left'},
			{text: "Length(yard)", width:80, dataIndex:'length_yards', sortable:true, align:'left'},
			{text: "Price", width:60, dataIndex:'price', sortable:true, align:'left'},
			{text: "cost", width:60, dataIndex:'cost', sortable:true, align:'left'},
			{text: "Active", width:50, dataIndex:'is_active', sortable:true, align:'center',
				renderer: function(v,p,r){
					var icns = (v)?'tick':'cross';
					p.style = "background:transparent url('"+__base_url+"assets/images/icons/"+icns+".gif') no-repeat center center";
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