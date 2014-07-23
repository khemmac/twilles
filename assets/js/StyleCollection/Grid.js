Ext.define('TCMS.StyleCollection.Grid', {
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
					type: 'v_style_collection',
					filter: Ext.encode({
						style_type: '1'
					})
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'code', type:'string' },
				{ name:'name', type:'string' },
				{ name:'style_group_id', type:'int' },
				{ name:'style_group_name', type:'string' },
				'description',
				{ name:'part_collar_id', type:'string' },
				{ name:'part_collar_code', type:'string' },
				{ name:'part_collar_name', type:'string' },
				{ name:'part_collar_type', type:'int' },
				'part_collar_type_name',
				{ name:'part_collar_width', type:'float' },
				{ name:'part_collar_stay', type:'int' },

				{ name:'part_cuff_id', type:'string' },
				{ name:'part_cuff_code', type:'string' },
				{ name:'part_cuff_name', type:'string' },
				{ name:'part_cuff_type', type:'int' },
				'part_cuff_type_name',
				{ name:'part_cuff_thickness', type:'float' },
				{ name:'part_cuff_width', type:'float' },

				{ name:'part_placket_id', type:'string' },
				{ name:'part_placket_code', type:'string' },
				{ name:'part_placket_name', type:'string' },
				{ name:'part_placket_width', type:'float' },

				{ name:'part_pocket_id', type:'string' },
				{ name:'part_pocket_code', type:'string' },
				{ name:'part_pocket_name', type:'string' },

				{ name:'part_yoke_id', type:'string' },
				{ name:'part_yoke_code', type:'string' },
				{ name:'part_yoke_name', type:'string' },
				{ name:'part_pleat_id', type:'string' },
				{ name:'part_pleat_code', type:'string' },
				{ name:'part_pleat_name', type:'string' },

				{ name:'part_bottom_id', type:'string' },
				{ name:'part_bottom_code', type:'string' },
				{ name:'part_bottom_name', type:'string' },

				{ name:'stitching_type', type:'int' },
				{ name:'stitching_type_name', type:'string' },

				{ name:'inventory_button_id', type:'string' },
				{ name:'inventory_button_name', type:'string' },
				{ name:'inventory_label_id', type:'string' },
				{ name:'inventory_label_name', type:'string' },
				{ name:'inventory_packaging_id', type:'string' },
				{ name:'inventory_packaging_name', type:'string' },

				'remark',
				{ name:'fabric_collar_inner_id', type:'string' },
				{ name:'fabric_collar_inner_name', type:'string' },
				{ name:'fabric_collar_outer_id', type:'string' },
				{ name:'fabric_collar_outer_name', type:'string' },
				{ name:'fabric_body_id', type:'string' },
				{ name:'fabric_body_name', type:'string' },
				{ name:'fabric_placket_id', type:'string' },
				{ name:'fabric_placket_name', type:'string' },
				{ name:'fabric_cuff_inner_id', type:'string' },
				{ name:'fabric_cuff_inner_name', type:'string' },
				{ name:'fabric_cuff_outer_id', type:'string' },
				{ name:'fabric_cuff_outer_name', type:'string' },

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
			{text: "Code", width:150, dataIndex:'code', sortable:true, align:'left'},
			{text: "Style group", width:90, dataIndex:'style_group_name', sortable:true, align:'left' },
			{text: "Collar", width:80, dataIndex:'part_collar_code', sortable:true, align:'left'},
			{text: "Cuff", width:100, dataIndex:'part_cuff_code', sortable:true, align:'left'},
			{text: "Placket", width:80, dataIndex:'part_placket_code', sortable:true, align:'left'},
			{text: "Pocket", width:80, dataIndex:'part_pocket_code', sortable:true, align:'left'},
			{text: "Yoke", width:80, dataIndex:'part_yoke_code', sortable:true, align:'left'},
			{text: "Pleat", width:80, dataIndex:'part_pleat_code', sortable:true, align:'left'},
			{text: "Bottom", width:80, dataIndex:'part_bottom_code', sortable:true, align:'left'},
			{text: "Stitching", width:90, dataIndex:'stitching_type_name', sortable:true, align:'left'},
			{text: "Inventory", width:100, dataIndex:'inventory_button_id', sortable:true, align:'left',
				renderer: function(v,p,r){
					var s = [];
					if(!Ext.isEmpty(r.get('inventory_button_name_tailor')))
						s.push(r.get('inventory_button_name_tailor'));
					if(!Ext.isEmpty(r.get('inventory_label_name_tailor')))
						s.push(r.get('inventory_label_name_tailor'));
					if(!Ext.isEmpty(r.get('inventory_packaging_name_tailor')))
						s.push(r.get('inventory_packaging_name_tailor'));
					return s.join('<br />');
				}
			},
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