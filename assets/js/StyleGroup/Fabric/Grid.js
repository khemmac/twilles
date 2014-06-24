Ext.define('TCMS.StyleGroup.Fabric.Grid', {
	extend	: 'BASE.Grid',
	requires: ['BASE.Grid', 'Ext.ux.grid.FiltersFeature'],
	constructor:function(config) {

		var featureFilters = Ext.create('Ext.ux.grid.FiltersFeature', {
			// encode and local configuration options defined previously for easier reuse
			encode: false, // json encode the filter query
			local: false,   // defaults to false (remote filtering)
			filters: [{
				type: 'string',
				dataIndex: 'id'
			}, {
				type: 'string',
				dataIndex: 'primary_color_name'
			}, {
				type: 'list',
				dataIndex: 'pattern_name',
				options: ['small', 'medium', 'large', 'extra large']
			}]
		});

		Ext.apply(this, {
			features: [featureFilters],
			disablePaging: true
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		var colorStore = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+'backend/dao/loadlist',
				reader: {
					type: 'json',
					root: 'rows',
					idProperty: 'id'
				},
				simpleSortMode: true,
				extraParams: { type:'color' }
			},
			fields: [ 'id', 'name' ],
			remoteSort: true,
			sorters: [{property: 'name', direction: 'ASC'}],
			pageSize: 1000
		});

		this.store = new Ext.data.JsonStore({
			proxy: {
				type: 'ajax',
				url: __site_url+"backend/style_group_fabric/loadlist",
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
				'update_by',


				{ name:'checked', type:'boolean' }
			],
			remoteSort: true,
			sorters: [{property: 'id', direction: 'ASC'}],
			pageSize: 25
		});

		this.columns = [
			new Ext.grid.RowNumberer({width: 30}),

			{text: "Code", width:80, dataIndex:'id', sortable:true, align:'left',
				filterable: true
			},
			{text: "Fabric Type", width:80, dataIndex:'fabric_type_name', sortable:true, align:'left'},
			{text: "Supplier", width:70, dataIndex:'supplier_name', sortable:true, align:'left'},
			{text: "Stock Type", width:80, dataIndex:'stock_type_name', sortable:true, align:'left', hidden: true},

			{text: "Primary color", width:80, dataIndex:'primary_color_name', sortable:true, align:'left',
				filter: {
					type: 'string'
					// specify disabled to disable the filter menu
					//, disabled: true
				}
			},
			{text: "Secondary color", width:80, dataIndex:'secondary_color_name', sortable:true, align:'left'},
			{text: "Tertiary color", width:80, dataIndex:'tertiary_color_name', sortable:true, align:'left'},
			{text: "True color", width:80, dataIndex:'true_color_name', sortable:true, align:'left'},

			{text: "Pattern", width:80, dataIndex:'pattern_name', sortable:true, align:'left'},
			{text: "Texture", width:80, dataIndex:'texture_name', sortable:true, align:'left'},
			{text: "Thread count", width:80, dataIndex:'thread_count_name', sortable:true, align:'left'},
			{text: "Length(yard)", width:80, dataIndex:'length_yards', sortable:true, align:'left'},
			{text: "Price", width:60, dataIndex:'price', sortable:true, align:'left'},
			{text: "Cost", width:60, dataIndex:'cost', sortable:true, align:'left'},

			{text: "Create date", width:120, dataIndex:'create_date', sortable:true, align:'left', hidden: true,
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Create by", width:100, dataIndex:'create_by', sortable:true, align:'left', hidden: true},
			{text: "Update date", width:120, dataIndex:'update_date', sortable:true, align:'left', hidden: true,
				renderer: function(v){ return (v)?Ext.Date.format(v, 'd/m/Y H:i:s'):'-'; }
			},
			{text: "Update by", width:100, dataIndex:'update_by', sortable:true, align:'left', hidden: true}
		];

		console.log('$$$$$$', this.filters, this.features);

		// event
		this.store.on("beforeload", function (store, opts) {
			opts.params = opts.params || {};
			if(opts.params){
			}
		});

		this.on('afterLoad', function(grid, ids){
			setTimeout(function(){
				var sm = _this.selModel;
				sm.deselectAll();
				var rs = [];
				_this.store.each(function(r){

					if(r.get('checked')===true)
						rs.push(r);
				});
				rs.reverse();

				sm.select(rs, true);
			}, 200);
		});

		return this.callParent(arguments);
	}
});