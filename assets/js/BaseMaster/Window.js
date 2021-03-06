Ext.define('TCMS.BaseMaster.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],

	moduleType: null,

	constructor:function(config) {

		Ext.apply(this, {
			height: 140,
			width: 300,
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
			moduleType: this.moduleType
		});

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: {
				labelWidth: 60,
				labelAlign: 'right',
				width: 250
			},
			items: [{
				name: 'name',
				xtype: 'textfield',
				fieldLabel: 'Name',
				allowBlank: false
			}/*, {
				name: 'alias',
				xtype: 'textfield',
				fieldLabel: 'Alias',
				allowBlank: false
			}*/, {
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
					type: _this.moduleType
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
					type: _this.moduleType
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getSetStatusParams : function() {
				return Ext.apply({
					type : _this.moduleType
				}, this.formParams);
			},
			getSetStatusUrl : function() {
				return __site_url+'backend/istatus/set';
			},
			setStatus : function() {
				var _this = this;
				var url = form.getSetStatusUrl();
				_this.form.load({
					url : url,
					clientValidation : true,
					success : function(form, act) {
						_this.fireEvent('afterSetStatus', _this, act);
					},
					failure : _this.failureAlert,
					waitMsg : 'Changing status...',
					waitTitle : 'Please wait...',
					params : _this.getSetStatusParams()
				});
			}
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

		this.items = [this.form];

		this.submitAct.setHandler(function(){
			_this.form.saveData();
		});

		this.cancelAct.setHandler(function(){
			_this.hide();
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
		}
	}
});
