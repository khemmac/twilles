Ext.define('TCMS.Order.Item.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		Ext.apply(this, {
			disablePaging: true
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
					type: 'v_order_item'
				}
			},
			fields: [
				{ name:'id', type:'int' },
				{ name:'item_price', type:'float' },
				{ name:'item_amount', type:'int' },

				// size
				{ name:'collar', type:'float' },
				{ name:'shoulder', type:'float' },
				{ name:'shoulder_center', type:'float' },
				{ name:'shoulder_side', type:'float' },
				{ name:'shoulder_shape', type:'float' },
				{ name:'shoulder_level', type:'float' },
				{ name:'shoulder_slope', type:'float' },
				{ name:'chest', type:'float' },
				{ name:'chest_buffer', type:'float' },
				{ name:'chest_front', type:'float' },
				{ name:'chest_back', type:'float' },
				{ name:'chest_height', type:'float' },
				{ name:'chest_distance', type:'float' },
				{ name:'chest_frontpiece', type:'float' },
				{ name:'chest_backpiece', type:'float' },
				{ name:'waist', type:'float' },
				{ name:'waist_buffer', type:'float' },
				{ name:'waist_frontpiece', type:'float' },
				{ name:'waist_backpiece', type:'float' },
				{ name:'hips', type:'float' },
				{ name:'hips_buffer', type:'float' },
				{ name:'hips_frontpiece', type:'float' },
				{ name:'hips_backpiece', type:'float' },
				{ name:'length_in_front', type:'float' },
				{ name:'length_in_back', type:'float' },
				{ name:'length_out_front', type:'float' },
				{ name:'length_out_back', type:'float' },
				{ name:'left_sleeve', type:'float' },
				{ name:'right_sleeve', type:'float' },
				{ name:'biceps', type:'float' },
				{ name:'biceps_buffer', type:'float' },
				{ name:'elbow', type:'float' },
				{ name:'elbow_buffer', type:'float' },
				{ name:'wrist', type:'float' },
				{ name:'armhole', type:'float' },
				{ name:'armhole_buffer', type:'float' },

				// reciept
				{ name:'style_group_id', type:'int' },
				{ name:'style_group_name', type:'string' },
				'description',
				{ name:'part_collar_id', type:'string' },
				{ name:'part_collar_name', type:'string' },
				{ name:'part_collar_type', type:'int' },
				'part_collar_type_name',
				{ name:'part_collar_width', type:'float' },
				{ name:'part_collar_stay', type:'int' },

				{ name:'part_cuff_id', type:'string' },
				{ name:'part_cuff_name', type:'string' },
				{ name:'part_cuff_type', type:'int' },
				'part_cuff_type_name',
				{ name:'part_cuff_thickness', type:'float' },
				{ name:'part_cuff_width', type:'float' },

				{ name:'part_placket_id', type:'string' },
				{ name:'part_placket_name', type:'string' },
				{ name:'part_placket_width', type:'float' },

				{ name:'part_pocket_id', type:'string' },
				{ name:'part_pocket_name', type:'string' },

				{ name:'part_yoke_id', type:'string' },
				{ name:'part_yoke_name', type:'string' },
				{ name:'part_pleat_id', type:'string' },
				{ name:'part_pleat_name', type:'string' },
				{ name:'part_bottom_id', type:'string' },
				{ name:'part_bottom_name', type:'string' },

				{ name:'stitching_type', type:'int' },
				{ name:'stitching_type_name', type:'string' },

				{ name:'inventory_button_id', type:'string' },
				{ name:'inventory_button_name', type:'string' },
				{ name:'inventory_label_id', type:'string' },
				{ name:'inventory_label_name', type:'string' },

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

				{ name:'style_collection_id', type:'int' },
				{ name:'style_collection_type', type:'int' },
				{ name:'style_collection_code', type:'string' },

				{ name:'fabric_type_id', type:'int' },
				{ name:'fabric_type_name', type:'string' },
				{ name:'fabric_type_cost', type:'float' },
				{ name:'fabric_type_price', type:'float' },

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
			{text: "Body fabric", width:100, dataIndex:'fabric_body_id', sortable:true, align:'left'},
			{text: "Fabric type", width:90, dataIndex:'fabric_type_name', sortable:true, align:'left',
				renderer: function(v){ return (!Ext.isEmpty(v))?v:'-'; }
			},
			{text: "Amount", width:60, dataIndex:'item_amount', sortable:true, align:'left' },
			{text: "Fabric price", width:90, dataIndex:'item_price', sortable:true, align:'left',
				renderer: Ext.util.Format.numberRenderer('0,000.##')
			},
			{text: "Style collection", width:130, dataIndex:'style_collection_type', sortable:true, align:'left',
				renderer: function(v,p,r){
					if(v){
						var code = r.get('style_collection_code');
						if(v==1)
							return 'Base style ('+code+')';
						else if(v==2)
							return 'Trend style ('+code+')';
						else
							return '-';
					}else{
						return '-';
					}
				}
			},
			{text: "Total", width:90, dataIndex:'Amount', sortable:false, align:'left', renderer: function(v,p,r){
				var total = r.data.item_amount * r.data.item_price;
				return Ext.util.Format.number(total, '0,000.##');
			}}
		];

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