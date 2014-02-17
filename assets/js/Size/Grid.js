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
				{ name:'id', type:'string' },
				{ name:'collar', type:'float' },
				{ name:'shoulder', type:'float' },
				{ name:'chest', type:'float' },
				{ name:'waist', type:'float' },
				{ name:'hips', type:'float' },
				{ name:'length_in', type:'float' },
				{ name:'length_out', type:'float' },
				{ name:'left_sleeve', type:'float' },
				{ name:'right_sleeve', type:'float' },
				{ name:'biceps', type:'float' },
				{ name:'elbow', type:'float' },
				{ name:'wrist', type:'float' },
				{ name:'chest_height', type:'float' },
				{ name:'chest_distance', type:'float' },

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
			{text: "Collar", width:70, dataIndex:'collar', sortable:true, align:'left' },
			{text: "Shoulder", width:70, dataIndex:'shoulder', sortable:true, align:'left'},
			{text: "Chest", width:70, dataIndex:'chest', sortable:true, align:'left'},
			{text: "Waist", width:70, dataIndex:'waist', sortable:true, align:'left'},
			{text: "Hips", width:70, dataIndex:'hips', sortable:true, align:'left'},
			{text: "Length in", width:70, dataIndex:'length_in', sortable:true, align:'left'},
			{text: "Length out", width:70, dataIndex:'length_out', sortable:true, align:'left'},
			{text: "Left sleeve", width:70, dataIndex:'left_sleeve', sortable:true, align:'left'},
			{text: "Right sleeve", width:70, dataIndex:'right_sleeve', sortable:true, align:'left'},
			{text: "Biceps", width:70, dataIndex:'biceps', sortable:true, align:'left'},
			{text: "Elbow", width:70, dataIndex:'elbow', sortable:true, align:'left'},
			{text: "Wrist", width:70, dataIndex:'wrist', sortable:true, align:'left'},
			{text: "Chest height", width:70, dataIndex:'chest_height', sortable:true, align:'left'},
			{text: "Chest distance", width:70, dataIndex:'chest_distance', sortable:true, align:'left'},
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