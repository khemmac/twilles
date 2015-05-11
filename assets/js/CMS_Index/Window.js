Ext.define('TCMS.CMS_Index.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 250,
			width: 450,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: {
				labelWidth: 60,
				labelAlign: 'right',
				width: 250
			},
			items: [{
				name: 'title',
				xtype: 'textfield',
				fieldLabel: 'Title',
				allowBlank: false
			}, {
				name: 'detail',
				xtype: 'textarea',
				fieldLabel: 'Detail',
				allowBlank: false,
				width: 400
			}, {
				name: 'link',
				xtype: 'textfield',
				fieldLabel: 'Link',
				vtype: 'url',
				width: 350
			}, {
				name: 'photo',
				xtype: 'textfield',
				fieldLabel: 'Photo',
				width: 350
			}],
			plugins: [],
			mapping: function(o){
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend_cms/index/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend_cms/index/load'; },
			getDeleteParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getDeleteUrl: function(){ return __site_url+'backend_cms/index/delete'; }
		});

		this.submitAct = Ext.create('BASE.Action', {
			text: 'Submit'
		});

		this.cancelAct = Ext.create('BASE.Action', {
			text: 'Cancel'
		});

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		//this.progress.show();

		this.items = [this.form];

		this.submitAct.setHandler(function(){
			_this.form.saveData();
			//_this.fireEvent('login_success');
		});

		this.cancelAct.setHandler(function(){
			_this.hide();
		});

		this.form.on('form_key_enter', function(){
			_this.submitAct.execute();
		});

		this.on("show", function() {
			_this.form.getEl().scrollTo('top',0,false);
			_this.form.formParams = _this.dialogParams;
			_this.form.formAction = _this.dialogAction;
			_this.actions[_this.dialogAction].call(_this);
		});

		return this.callParent(arguments);
	},
	actions : {
		"add" : function() {
			this.form.form.reset();
		},
		"edit" : function() {
			this.form.form.reset();
			this.form.loadData();
		},
		"delete" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.deleteData();
			});
		},
		"setStatus" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.setStatus();
			});
		}
	}
});
