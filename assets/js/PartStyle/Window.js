Ext.define('TCMS.PartStyle.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 290,
			width: 400,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'part_style'
		});

		this.comboPartType = Ext.create('BASE.ComboStatic', {
			fieldLabel:'Part type',
			name : 'part_type',
			store:[
				['COLLAR', 'Collar'],
				['CUFF', 'Cuff'],
				['PLACKET', 'Placket'],
				['POCKET', 'Pocket'],
				['BOTTOM', 'Bottom'],
				['YOKE', 'Yoke'],
				['PLEAT', 'Pleat']
			]
		});
/*
		this.comboConflictType = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Conflict color',
			name : 'conflict_type',
			proxyUrl: __site_url+'backend/enum/LoadListCombo_ConflictType',
			proxyFields:[ 'value', 'text' ],
			proxyIdProperty: 'value',
			displayField: 'text',
			valueField: 'value'
		});
*/
		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: {
				labelWidth: 100,
				labelAlign: 'right',
				width: 300
			},
			items: [{
				name: 'code',
				xtype: 'textfield',
				fieldLabel: 'Code',
				allowBlank: false
			},{
				name: 'name',
				xtype: 'textfield',
				fieldLabel: 'Name',
				allowBlank: false
			},
			this.comboPartType, {
				name: 'remark',
				xtype: 'textarea',
				fieldLabel: 'Remark'
			}, {
				name: 'is_active',
				xtype: 'checkboxfield',
				fieldLabel: 'Active',
				checked: !0
			}],
			plugins: [uxFormStatus],
			mapping: function(o){
				o.is_active = (o.is_active && o.is_active=='on')?1:0;
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/icode/'+((_this.dialogAction == "add")?'insert':'update'); },
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


		// event
/*
		this.comboConflictType.store.on("beforeload", function (store, opts) {
			opts.params = opts.params || {};
			if(opts.params){
				var partType = _this.comboPartType.getValue();
				Ext.apply(opts.params, {
					part_type: partType
				});
			}
	    });

	    this.comboPartType.on('change', function(){
	    	_this.comboConflictType.reset();
	    	_this.comboConflictType.store.load();
	    });
*/
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
