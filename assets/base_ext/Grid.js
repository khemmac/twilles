Ext.define('BASE.Grid', {
	extend	: 'Ext.grid.Panel',
	constructor:function(config) {
		config = Ext.apply(config, {
			loadMask : true
		});

		Ext.apply(this, config);

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		if (!this.selModel)
			this.selModel = new Ext.selection.CheckboxModel();

		if (!this.store)
			this.store = new Ext.data.JsonStore({
				proxy: {
					type: 'ajax',
					url: __site_url+"dummy/loads",
					reader: {
						type: 'json',
						root: 'rows',
						totalProperty: 'totalCount',
						idProperty: 'id'
					},
					simpleSortMode: true
				},
				fields: [
					'id',
					'name'
				],
				remoteSort: true,
				sorters: [{property: 'id', direction: 'ASC'}],
				pageSize: 25

			});

		if (!this.columns)
			this.columns = [
				this.selModel,
				//new Ext.grid.RowNumberer(),
				{text: "Id", width:90, dataIndex:'id', sortable:true},
				{text: "Name", width:80, dataIndex:'name', sortable:true, align:'center'}
			];

		if (!this.bbar && !this.disablePaging)
			this.bbar = {
				xtype: 'pagingtoolbar',
				store: this.store,
				displayInfo: true
			};


		this.addEvents('selectionchange', 'afterLoad');

		this.selModel.on('selectionchange', function(sm) {
			this.validate();
			this.fireEvent('selectionchange', this, sm);
		}, this);

		return this.callParent(arguments);
	},
	getSelectionsObject : function() {
		var rs = [],
			sm = this.getView().getSelectionModel(),
			rs = sm.getSelection();
		return rs;
	},
	getSelectionsId : function() {
		var rs = this.getSelectionsObject(),
			ids = [],
			rId = this.store.getProxy().getReader().idProperty;
		Ext.each(rs, function(o, i, a) {
			ids.push(o.get(rId));
		});
		return ids;
	},
	getSelectedId : function() {
		var ids = this.getSelectionsId();
		return Ext.isArray(ids) ? ids[0] : ids;
	},
	getSelectedObject : function() {
		var sm = this.selModel;
		var rs = this.getSelectionsObject();
		var ids = [];
		Ext.each(rs, function(o, i, a) {
			ids.push(o);
		});
		return ids[0];
	},


	/** * ILoadable ** */
	load : function(arg, cb) {
		//if(typeof(arg)!="object"){
		//	this.reload();
		//	return;
		//}
		var ds = this.store;

		var baseParam = {};
		//Ext.apply(ds.baseParams, arg);

		// selection model buff
		var sm = this.selModel,
			sels = this.getSelectionsObject();

		var ids = this.getSelectionsId();
		var _this = this;
		baseParam = {
			params : arg,
			callback : function() {
				_this.fireEvent('afterLoad', _this, ids);

				// unset then set selection if "ids"
				if(!Ext.isEmpty(ids)){
					sm.deselectAll();
					var mdls = [];
					for(var i=0;i<ids.length;i++){
						mdls.push(_this.store.getById(ids[i]));
					}
					sm.select(mdls);
				}
				if(typeof(cb)=='function') cb(_this, ids);

				// call validate
				_this.validate();
			}
		};
/*
		if (!this.disablePaging)
			baseParam.params = {
				start : 0,
				limit : this.paging.pageSize
			};
*/
		ds.load(baseParam);
	},
	reload : function(){
		alert('do reload');
		var ds = this.store;
		var ids = this.getSelectionsId();
		var _this = this;
		ds.reload({
			callback : function() {
				_this.validate();
				_this.fireEvent('afterLoad', _this, ids);
			},
			params : {
				//start :this.paging.cursor,
				//limit : this.paging.pageSize
			}
		});
	},
	/*
	load: function(arg){
		//if(typeof(arg)!="object"){
		//	this.reload();
		//	return;
		//}
		this.store.load({
			params: arg
		});
	},
*/
	// actions
	validateActions : [],
	validate : function() {
		//console.log('validate action');
		//console.log(this.validateActions);
		Ext.each(this.validateActions, function(o, i, a) {
			if (typeof(o.validate) == "function")
				o.validate(this);
		}, this);
	}
});