Ext.define('TCMS.MemberSize.Selector.Grid', {
	extend	: 'BASE.Grid',
	constructor:function(config) {

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.selModel = new Ext.selection.RowModel();

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
					type: 'v_member_size',
					filter: Ext.encode({
						active: 1
					})
				}
			},
/*
member_id,
member_username,
member_fullname,
member_email,
size_type,
size_type_name,
name,
collar,
shoulder,
shoulder_center,
shoulder_side,
shoulder_shape,
shoulder_level,
shoulder_slope,
chest,
chest_buffer,
chest_front,
chest_back,
chest_height,
chest_distance,
chest_frontpiece,
chest_backpiece,
waist,
waist_buffer,
waist_frontpiece,
waist_backpiece,
hips,
hips_buffer,
hips_frontpiece,
hips_backpiece,
length_in_front,
length_in_back,
length_out_front,
length_out_back,
sleeve_left,
sleeve_right,
biceps,
biceps_buffer,
elbow,
elbow_buffer,
wrist,
armhole,
armhole_buffer,
is_active
*/
			fields: [
				{ name:'id', type:'string' },
				{ name:'member_email', type:'string' },
				{ name:'size_type', type: 'int' },
				{ name:'size_type_name', type: 'string' },
				{ name:'name', type: 'string' },

				{ name:'collar', type:'float' },

				{ name:'shoulder', type:'float' },
				{ name:'shoulder_center', type:'float' },
				{ name:'shoulder_side', type:'float' },

				{ name:'shoulder_shape', type:'int' },
				{ name:'shoulder_level', type:'int' },
				{ name:'shoulder_slope', type:'int' },

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
				{ name:'sleeve_left', type:'float' },
				{ name:'sleeve_right', type:'float' },
				{ name:'biceps', type:'float' },
				{ name:'biceps_buffer', type:'float' },
				{ name:'elbow', type:'float' },
				{ name:'elbow_buffer', type:'float' },
				{ name:'wrist', type:'float' },
				{ name:'armhole', type:'float' },
				{ name:'armhole_buffer', type:'float' },


				{ name:'is_active', type:'int' },

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
			{text: "Member", width:140, dataIndex:'member_email', sortable:true, align:'left' },
			{text: "Size type", width:130, dataIndex:'size_type', sortable:true, align:'left', renderer:function(v,p,r){
				return r.data.size_type_name;
			} },
			{text: "Size name", width:150, dataIndex:'name', sortable:true, align:'left' },

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

		return this.callParent(arguments);
	}
});