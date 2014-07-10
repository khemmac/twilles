Ext.define('TCMS.SendShirt.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			title: 'Login',
			height: 290,
			width: 600,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center',
			border: false,
			layout: 'border'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;


		this.returnAct = Ext.create('BASE.ActionSingle', {
			text: 'Returned',
			iconCls: 'b-small-arrow-return-180'
		});
		this.returnAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject();
				if(o.get('status')!=1)
					this.setDisabled(true);
			}
		};

		this.completeAct = Ext.create('BASE.ActionSingle', {
			text: 'Completed',
			iconCls: 'b-small-tick'
		});
		this.completeAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject();
				if(o.get('status')!=2)
					this.setDisabled(true);
			}
		};

		this.statusGrid = Ext.create('TCMS.SendShirt.Status.Grid', {
			region: 'east',
			width: 240,
			split: true,
			border:true,
			tbar: [this.returnAct, this.completeAct]
		});

		var _fieldDefaults = {
			labelWidth: 100,
			labelAlign: 'right',
			width: 300
		};

		var _createField = function(ns, config){
			return Ext.create(ns, Ext.apply(config, _fieldDefaults));
		};

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			border: true,
			defaults: _fieldDefaults,
			items: [{
				xtype:'displayfield',
				name: 'first_name',
				fieldLabel: 'First name'
			},{
				xtype:'displayfield',
				name: 'last_name',
				fieldLabel: 'Last name'
			},
			_createField('BASE.field.FormattableDisplayField', {
				xtype:'displayfield',
				name: 'create_date',
				fieldLabel: 'Submit date',
				displayFormat: 'd/m/Y H:i'
			}),{
				xtype:'displayfield',
				name: 'shirt_brand',
				fieldLabel: 'Brand'
			},{
				xtype:'displayfield',
				name: 'shirt_color',
				fieldLabel: 'Color'
			},{
				xtype:'displayfield',
				name: 'shirt_size',
				fieldLabel: 'Size'
			}],
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getDeleteUrl: function(){ return __site_url+'backend/dao/delete'; },
			getSetCompleteParams : function() {
				return Ext.apply({}, this.formParams);
			},
			getSetCompleteUrl : function() {
				return __site_url+'backend/send_shirt/SetComplete';
			},
			setComplete : function() {
				var _this = this;
				var url = _this.getSetCompleteUrl();
				_this.form.load({
					url : url,
					clientValidation : true,
					success : function(form, act) {
						_this.fireEvent('afterChangeStatus', _this, act);
					},
					failure : _this.failureAlert,
					waitMsg : 'Changing status...',
					waitTitle : 'Please wait...',
					params : _this.getSetCompleteParams()
				});
			},
			setReturn : function() {
				var _this = this;
				var url = __site_url+'backend/send_shirt/SetReturn';
				_this.form.load({
					url : url,
					clientValidation : true,
					success : function(form, act) {
						_this.fireEvent('afterChangeStatus', _this, act);
					},
					failure : _this.failureAlert,
					waitMsg : 'Changing status...',
					waitTitle : 'Please wait...',
					params : Ext.apply({}, _this.formParams)
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

		//this.progress.show();

		this.items = [this.form, this.statusGrid];

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
			this.statusGrid.load({
				id: this.dialogParams.id
			});

			this.form.form.reset();
			this.form.loadData();
		},
		"delete" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.deleteData();
			});
		},
		"setReturn" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.setReturn();
			});
		},
		"setComplete" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.setComplete();
			});
		}
	}
});
