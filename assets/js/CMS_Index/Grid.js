Ext.define('TCMS.CMS_Index.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;
/*
		this.searchAct = new Ext.Action({
			text: 'Search',
			iconCls: 'b-small-magnifier',
			animate: true
		});

		this.resetAct = new Ext.Action({
			text: 'Reset',
			iconCls: 'b-small-cross',
			animate: true
		});

		this.txtKeyword = Ext.create('Ext.form.TextField', {
			xtype: 'textfield',
			name: 'keyword',
			emptyText: 'keywords',
			hideLabel: true,
			width: 200,
			listeners : {
				specialkey : function(o, e) {
					if (e.getKey() == e.ENTER)
						_this.searchAct.execute();
				}
			}
		});

		this.comboCustomerAccount = Ext.create('Ext.form.ComboBox', {
			name: 'custacct',
			emptyText: '-- Select Customer Account --',
			forceSelection: true,
			labelAlign:'right',
			width: 200,
			store: Ext.create('Ext.data.Store', {
				fields: ['value', 'text'],
				data : [
					{"value":"", "text":"-- Select Customer Account --"},
					{"value":"1", "text":"Cash"},
					{"value":"6", "text":"Credit Balance"},
					{"value":"H", "text":"Cash Balance"},
					{"value":"5", "text":"TSFC"},
					{"value":"I", "text":"Internet Settrade"},
					{"value":"2", "text":"Cash Margin"},
					{"value":"3", "text":"PN Margin"}
				]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			listeners : {
				specialkey : function(o, e) {
					if (e.getKey() == e.ENTER)
						_this.searchAct.execute();
				}
			}
		});

		this.comboCardType = Ext.create('Ext.form.ComboBox', {
			name: 'cardidtype',
			emptyText: '-- Select Card Type --',
			forceSelection: true,
			labelAlign:'right',
			width: 200,
			store: Ext.create('Ext.data.Store', {
				fields: ['value', 'text'],
				data : [
					{"value":"", "text":"-- Select Card Type --"},
					{"value":"0", "text":"เลขประจำตัวบัตรประชาชน (ใน)"},
					{"value":"1", "text":"เลขประจำตัวบัตรประชาชน (นอก)"},
					{"value":"2", "text":"เลขที่ต่างด้าว"},
					{"value":"3", "text":"Passport"},
					{"value":"4", "text":"เลขที่เสียภาษี (นอก)"},
					{"value":"5", "text":"เลขที่บริษัทฯ"},
					{"value":"6", "text":"มูลนิธิ"},
					{"value":"7", "text":"สมาคม"},
					{"value":"8", "text":"วัด"},
					{"value":"9", "text":"บริษัทที่ไม่หวังผลกำไร"},
					{"value":"A", "text":"ห้างหุ้นส่วนสามัญ"}
				]
			}),
			queryMode: 'local',
			displayField: 'text',
			valueField: 'value',
			listeners : {
				specialkey : function(o, e) {
					if (e.getKey() == e.ENTER)
						_this.searchAct.execute();
				}
			}
		});

		this.tbar = [
			'Search',
			this.txtKeyword,
			this.comboCustomerAccount,
			this.comboCardType,
			this.searchAct,
			this.resetAct
		];
*/
		this.store = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+"backend_cms/index/loadlist",
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				simpleSortMode: true
			},
			fields: [
				{ name:'id' },
				'title',
				'detail',
				'photo',
				'link'
			],
			remoteSort: false,
			sorters: [{property: 'id', direction: 'ASC'}],
			pageSize: 25
		});

		this.columns = [
			new Ext.grid.RowNumberer(),
			{text: "Title", width:120, dataIndex:'title', sortable:false, align:'left'},
			{text: "Detail", width:250, dataIndex:'detail', sortable:false, align:'left'},
			{text: "Photo", width:80, dataIndex:'photo', sortable:false, align:'left'},
			{text: "Link", width:250, dataIndex:'link', sortable:false, align:'left'}
		];
/*
		this.searchAct.setHandler(this.search, this);
		this.resetAct.setHandler(this.reset, this);
*/
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