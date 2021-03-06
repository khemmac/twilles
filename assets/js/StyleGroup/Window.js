Ext.define('TCMS.StyleGroup.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 550,
			width: 1000,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center',
			border: false
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'color'
		});

		this.fabricGrid = Ext.create('TCMS.StyleGroup.Fabric.Grid', {
			title: 'Availble fabric',
			region: 'west',
			width: 700,
			split: true,
			border: true
		});

		this.selectedGrid = Ext.create('TCMS.StyleGroup.Fabric.SelectedGrid', {
			title: 'Selected fabric',
			region: 'center',
			border: true
		});

		this.form = Ext.create('BASE.Form', {
			region: 'north',
			split: true,
			height: 45,
			border: true,
			defaults: {
				labelWidth: 60,
				labelAlign: 'right',
				width: 200
			},
			items: [{
				name: 'name',
				xtype: 'textfield',
				fieldLabel: 'Name',
				allowBlank: false
			}],
			plugins: [uxFormStatus],
			mapping: function(o){
				//o.is_active = (o.is_active && o.is_active=='on')?1:0;

				// prepare json data
				var selectionsId = _this.fabricGrid.getSelectionsId();
				o['fabric_ids'] = Ext.encode(selectionsId);

				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/style_group/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; }
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

		var selectPanel = Ext.create('Ext.panel.Panel', {
			region: 'center',
			layout: 'border',
			border: false,
			items: [this.fabricGrid, this.selectedGrid]
		});

		this.items = [this.form, selectPanel];

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

		// ** EVENT

		this.on("show", function() {
			_this.fabricGrid.load({
				style_group_id: _this.dialogParams.id
			});

			// common params
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
