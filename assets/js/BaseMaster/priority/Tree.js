Ext.define('TCMS.BaseMaster.priority.Tree', {
	extend	: 'Ext.tree.Panel',

	type: null,
	groupId: null,
	saveUrl: __site_url+'backend/ipriority/SavePriority',
	loadUrl: __site_url+"backend/ipriority/LoadTree",

	constructor:function(config) {

		Ext.apply(this, {
			loadMask: true,
			rootVisible: false
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.saveAct = Ext.create('BASE.Action', {
			text: 'Save priority',
			disabled: true//,
			//iconCls: 'b-application_add'
		});

		this.store = new Ext.data.TreeStore({
			autoLoad: false,
			proxy: {
				type: 'ajax',
				url: _this.loadUrl,
				reader: {
					type: 'json',
					root: 'rows',
					totalProperty: 'totalCount',
					idProperty: 'id'
				},
				simpleSortMode: true,
				extraParams: {
					type: _this.type,
					groupId: _this.groupId
				}
			},
			fields: [
				{ name:'id', type:'string' },
				{ name:'text', type:'string' }
			],
			remoteSort: true//,
			//sorters: [{property: 'id', direction: 'ASC'}],
			//pageSize: 25
		});

		this.form = Ext.create('BASE.Form', {
			border: true,
			items: [],
			getSaveParams : function() {
				return Ext.apply({
					type: _this.type,
					groupId: _this.groupId
				}, this.formParams);
			},
			mapping: function(o){
				var i = 0,
					root = _this.store.getRootNode(),
					list = [];
				root.eachChild(function(n){
					if(n)
						list.push({
							id: n.data.id,
							priority: ++i
						});
				});
				o.jsonData = Ext.JSON.encode(list);
				return o;
			},
			getSaveUrl: function(){ return _this.saveUrl; }
		});

		this.viewConfig = {
			plugins: {
				ptype: 'treeviewdragdrop'
			}
		};

		this.saveAct.setHandler(function(){
			_this.form.saveData();
		});

		// *** Event
		this.store.on('move', function(store, oldParent, newParent, index, eOpts){
			_this.saveAct.setDisabled(false);
		});

		this.form.on('afterSave', function(){
			_this.saveAct.setDisabled(true);
		});

		return this.callParent(arguments);
	}
});
