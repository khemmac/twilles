Ext.define('TCMS.MemberSize.Grid', {
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
					type: 'v_member_size'
				}
			},
			fields: [

/*
id,
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
				{ name:'id', type:'string' },
				{ name:'member_email', type:'string' },
				{ name:'size_type', type: 'int' },
				{ name:'size_type_name', type: 'string' },
				{ name:'name', type: 'string' },

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
			new Ext.grid.RowNumberer(),
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