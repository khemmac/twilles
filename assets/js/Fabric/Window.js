Ext.define('TCMS.Fabric.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 480,
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
			moduleType: 'color'
		});

		this.comboFabricType = Ext.create('BASE.ComboStatic', {
			fieldLabel:'Fabric type',
			name : 'fabric_type',
			store:[['1', 'ผ้าธรรมดา'], ['2', 'ผ้าแพง']]
		});

		this.comboSupplier = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Supplier',
			name : 'supplier_id',
			proxyExtraParams: {
				type:'supplier'
			}
		});

		this.comboFabricType = Ext.create('BASE.ComboStatic', {
			fieldLabel:'Stock type',
			name : 'stock_type',
			store:[['1', 'Running'], ['2', 'Finite']],
		});

		this.comboPrimaryColor = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Primary color',
			name : 'primary_color_id',
			proxyExtraParams: {
				type:'color'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}]
		});

		this.comboSecondaryColor = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Secondary color',
			name : 'secondary_color_id',
			proxyExtraParams: {
				type:'color'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: true
		});

		this.comboTertiaryColor = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Tertiary color',
			name : 'tertiary_color_id',
			proxyExtraParams: {
				type:'color'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: true
		});

		this.comboTrueColor = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'True color',
			name : 'true_color',
			maxLength: 100,
			allowBlank: true,
			labelAlign: 'right'
		});

		this.comboPattern = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Pattern',
			name : 'pattern_id',
			proxyExtraParams: {
				type:'pattern'
			},
			allowBlank: true
		});

		this.comboTexture = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Texture',
			name : 'texture_id',
			proxyExtraParams: {
				type:'texture'
			},
			allowBlank: true
		});

		this.comboThreadCount = Ext.create('BASE.ComboAjax', {
			fieldLabel: 'Thread count',
			name : 'thread_count_id',
			proxyExtraParams: {
				type:'thread_count'
			},
			allowBlank: true
		});


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
			},
			this.comboFabricType,
			this.comboSupplier,
			this.comboStockType,
			this.comboFabricType,
			this.comboPrimaryColor,
			this.comboSecondaryColor,
			this.comboSecondaryColor,
			this.comboTertiaryColor,
			this.comboTrueColor,
			this.comboPattern,
			this.comboTexture,
			this.comboThreadCount,
			{
				name: 'length_yards',
				xtype: 'numberfield',
				fieldLabel: 'Length (yards)'
			},{
				name: 'price',
				xtype: 'numberfield',
				fieldLabel: 'Price'
			},{
				name: 'cost',
				xtype: 'numberfield',
				fieldLabel: 'Cost'
			},{
				name: 'is_active',
				xtype: 'checkboxfield',
				fieldLabel: 'Active',
				checked: !0
			}],
			plugins: [uxFormStatus],
			mapping: function(o){
				var checkComboArr = [
					'primary_color_id',
					'secondary_color_id',
					'tertiary_color_id',
					'true_color_id',
					'pattern_id',
					'texture_id',
					'thread_count_id'
				];
				for(var i=0;i<checkComboArr.length;i++){
					if(Ext.isEmpty(o[checkComboArr[i]])){
						delete o[checkComboArr[i]];
					}
				}

				o.is_active = (o.is_active && o.is_active=='on')?1:0;
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
					type: 'fabric'
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/icode/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
					type: 'fabric'
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
