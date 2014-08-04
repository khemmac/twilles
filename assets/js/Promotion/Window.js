Ext.define('TCMS.Promotion.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			modelType: 'promotion_code',
			title: 'Login',
			height: 340,
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

		var _fieldDefaults = {
			labelAlign: 'right',
			labelWidth: 100,
			width: 300
		};

		Ext.apply(Ext.form.field.VTypes, {
			expireDateRange: function(val, field) {
				var date = field.parseDate(val);

				if (!date) {
					return false;
				}
				if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
					var start = field.up('form').form.findField(field.startDateField);
					start.setMaxValue(date);
					start.validate();
					this.dateRangeMax = date;
				}
				else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
					var end = field.up('form').form.findField(field.endDateField);
					end.setMinValue(date);
					end.validate();
					this.dateRangeMin = date;
				}
				/*
				 * Always return true since we're only using this vtype to set the
				 * min/max allowed values (these are tested for after the vtype test)
				 */
				return true;
			},

			expireDateRangeText: 'Valid date must be less than expire date'
		});

		var _createField = function(ns, config){
			return Ext.create(ns, Ext.applyIf(config, _fieldDefaults));
		};

		this.comboType = _createField('BASE.ComboStatic', {
			fieldLabel:'Type',
			name : 'promotion_type',
			value: '1',
			store:[['1', 'Bulk'], ['2', 'Percentage'], ['3', 'Voucher']]
		});

		this.dateValid = _createField('Ext.form.field.Date', {
			name: 'promotion_valid_date',
			fieldLabel: 'Valid date',
			allowBlank: true,
			format:'d/m/Y',
			altFormats:'Y-m-d|Y-m-d H:i:s|d/m/Y',
			submitFormat:'Y-m-d',
			editable: false,
			vtype: 'expireDateRange',
			endDateField: 'promotion_expire_date',
			value: new Date()
		});

		this.dateExpire = _createField('Ext.form.field.Date', {
			name: 'promotion_expire_date',
			fieldLabel: 'Expire date',
			allowBlank: true,
			format:'d/m/Y',
			altFormats:'Y-m-d|Y-m-d H:i:s|d/m/Y',
			submitFormat:'Y-m-d',
			vtype: 'expireDateRange',
			startDateField: 'promotion_valid_date',
			editable: false
		});

		this.amount = _createField('BASE.field.NumericField', {
			hideLabel:true,
			allowBlank: false,
			name : 'promotion_amount',
			minValue: 0,
			width: 150
		});

		this.amountDetail = _createField('Ext.form.field.Display', {
			hideLabel:true,
			name: 'promotion_amount_detail',
			value: ' %',
			hidden: true
		});

		this.chkNeverExpire = _createField('Ext.form.field.Checkbox', {
			name: 'never_expire',
			fieldLabel: 'Never expire',
			checked: !0
		});

		this.form = Ext.create('BASE.Form', {
			region: 'center',
			defaults: _fieldDefaults,
			items: [{
				name: 'id',
				xtype: 'displayfield',
				fieldLabel: 'Code',
				value: '-'
			},
			this.comboType,
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				fieldLabel: 'Amount',
				items: [
					this.amount,
					this.amountDetail
				]
			},
			this.chkNeverExpire,
			this.dateValid,
			this.dateExpire,
			{
				name: 'remark',
				xtype: 'textarea',
				fieldLabel: 'Remark',
				rows: 5
			}],
			mapping: function(o){
				o.never_expire = (o.never_expire && o.never_expire=='on')?1:0;
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
					type: 'inventory'
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/icode/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
					type: this.modelType
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getDeleteParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getDeleteUrl: function(){ return __site_url+'backend/dao/delete'; }
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

		// **** others event ****

		this.checkType = function(){
			var type = _this.comboType.getValue();
			_this.amountDetail[(type=='2')?'show':'hide']();
			if(type=='2'){
				_this.amount.setMaxValue(100);
			}else{
				_this.amount.setMaxValue(Number.MAX_VALUE);
			}
		};

		this.comboType.on('change', _this.checkType);

		this.checkExpire = function(){
			var isExpire = _this.chkNeverExpire.getValue();
			if(!isExpire){
				_this.dateValid.setDisabled(false);
				_this.dateExpire.setDisabled(false);
			}else{
				_this.dateValid.setDisabled(true);
				_this.dateExpire.setDisabled(true);
			}
		};

		this.chkNeverExpire.on('change', _this.checkExpire);

		this.form.on('afterLoad', function(form, act){
			_this.checkType();
			_this.checkExpire();
		});

		return this.callParent(arguments);
	},
	actions : {
		"add" : function() {
			this.form.form.reset();

			this.checkType(this.comboType.getValue());
			this.checkExpire(this.chkNeverExpire.getValue());
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
