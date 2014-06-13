Ext.define('TCMS.Order.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		Ext.apply(this, {
			bodyPadding : false,
			layout: 'border',
			autoScroll: false,
			mapping: function(o){
				var children = _this.items ? _this.items.items : [];
				for(var i=0;i<children.length;i++){
					var child = children[i];
					if(child && child.query){
						child.query('.field').forEach(function(c){
							if(c.xtype=='combobox' && Ext.isEmpty(o[c.name])){

								delete o[c.name];
								return false;
							}
						});
					}
				};

				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
					type: 'order'
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.formAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
					type: 'v_order'
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; }
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		// *** FIELDS ***
		var _fieldDefaults = {
			labelAlign: 'right',
			anchor:'100%',
			labelWidth: 90
		};

		var _createField = function(ns, config){
			return Ext.create(ns, Ext.apply(config, _fieldDefaults));
		};
/*
		this.comboStyleType = _createField('BASE.ComboStatic', {
			fieldLabel:'Style type',
			name : 'style_type',
			store:[
				['1', 'Base style'],
				['2', 'Trend style']
			]
		});
*/
		this.comboCountry = _createField('BASE.ComboAjax', {
			fieldLabel: 'Country',
			name : 'delivery_country_id',
			proxyExtraParams: {
				type:'country'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: true,
			value: '221'
		});

		this.comboAddressType = _createField('BASE.ComboStatic', {
			fieldLabel:'Address',
			name : 'delivery_address_type',
			allowBlank: true,
			store:[
				['0', 'Custom'],
				['1', 'Primary'],
				['2', 'Secondary']
			],
			value: '0'
		});

		this.triggerMember = _createField('Ext.form.field.Trigger', {
			fieldLabel:'Member',
			name : 'member_fullname',
			editable: false,
			triggerCls: 'x-form-search-trigger',
			allowBlank: false,
			submitValue: false
		});

		var evtDelListeners = {
			keyup: function(){
				if(_this.comboAddressType.getValue()!='0'){
					_this.comboAddressType.setValue('0');
				}
			}
		};

		var txtDelName = _createField('Ext.form.field.Text', {
				name: 'delivery_name',
				fieldLabel: 'Full name',
				enableKeyEvents: true,
				listeners: evtDelListeners
			}),
			txtDelAddress1 = _createField('Ext.form.field.TextArea', {
				name: 'delivery_address_line_1',
				fieldLabel: 'Address 1',
				rows: 2,
				enableKeyEvents: true,
				listeners: evtDelListeners
			}),
			txtDelAddress2 = _createField('Ext.form.field.TextArea', {
				name: 'delivery_address_line_2',
				fieldLabel: 'Address 2',
				rows: 2,
				enableKeyEvents: true,
				listeners: evtDelListeners
			}),
			txtDelCity = _createField('Ext.form.field.Text', {
				name: 'delivery_city',
				fieldLabel: 'City',
				enableKeyEvents: true,
				listeners: evtDelListeners
			}),
			txtDelState = _createField('Ext.form.field.Text', {
				name: 'delivery_state_province',
				fieldLabel: 'State/province',
				enableKeyEvents: true,
				listeners: evtDelListeners
			}),
			txtDelZip = _createField('Ext.form.field.Text', {
				name: 'delivery_zip',
				fieldLabel: 'Zip',
				enableKeyEvents: true,
				listeners: evtDelListeners
			}),
			txtDelPhone = _createField('Ext.form.field.Text', {
				name: 'delivery_phone',
				fieldLabel: 'Phone',
				enableKeyEvents: true,
				listeners: evtDelListeners
			});

		var formMain = Ext.create('Ext.panel.Panel', {
			region: 'north',
			split: true,
			border: true,
			height: 200,
			// column layout with 2 columns
			layout:'column',
			// defaults for columns
			defaults:{
				layout:'form',
				border:false,
				xtype:'panel',
				bodyStyle:'padding:0 22px 0 0'
			},
			items:[{
				// left column
				// defaults for fields
				columnWidth:0.3,
				defaults:_fieldDefaults,
				items:[{
					name: 'order_code',
					xtype: 'displayfield',
					fieldLabel: 'Code',
					value: 'xxxxxxxxxxxxxxxx'
				}, {
					name: 'order_date',
					xtype: 'datefield',
					fieldLabel: 'Order date',
					allowBlank: false,
					value: new Date(),
					format:'d/m/Y',
					altFormats:'Y-m-d|Y-m-d H:i:s|d/m/Y',
					submitFormat:'Y-m-d',
					editable: false,
					listeners: {
						select: function(o, val){
							_this.form.findField('order_completed_date').setValue(Ext.Date.add(val, Ext.Date.DAY, 7));
						}
					}
				}, {
					name: 'order_completed_date',
					xtype: 'datefield',
					fieldLabel: 'Complete date',
					allowBlank: false,
					value: new Date(),
					format:'d/m/Y',
					altFormats:'Y-m-d|Y-m-d H:i:s|d/m/Y',
					submitFormat:'Y-m-d',
					editable: false,
					value: Ext.Date.add(new Date(), Ext.Date.DAY, 7)
				},
				this.triggerMember, {
					name: 'member_id',
					xtype: 'hiddenfield'
				}]
			},{
				// column 2
				// defaults for fields
				columnWidth:0.7,
				defaults:_fieldDefaults,
				items:[{
					xtype: 'fieldset',
					title: 'Delivery info',
					defaults: _fieldDefaults,
					items: [{
						layout:'column',
						border:false,
						defaults:{
							layout:'form',
							border:false,
							xtype:'panel',
							bodyStyle:'padding:0 22px 0 0'
						},
						items:[{
							// delivery left column
							columnWidth:0.45,
							defaults:_fieldDefaults,
							items:[
								this.comboAddressType,
								txtDelName,
								txtDelCity,
								txtDelState,
								txtDelZip,
								this.comboCountry
							]
						},{
							// delivery left column
							columnWidth:0.55,
							defaults:_fieldDefaults,
							items:[txtDelAddress1, txtDelAddress2, txtDelPhone]
						}]
					}]
				}]
			}]
		});

		// **** ITEM AREA

		this.gridPanel = Ext.create('TCMS.Order.Item.Main', {
			region: 'center',
			title: 'Order item'
		});

		this.numberNet = _createField('Ext.form.field.Display', {
			fieldLabel:'Net',
			name : 'net',
			renderer: function(v, field){ return Ext.util.Format.number(v, '0,000.##'); }
		});

		this.dispNet = _createField('Ext.form.field.Display', {
			fieldLabel:'Net',
			name : 'net',
			renderer: function(v, field){ return Ext.util.Format.number(v, '0,000.##'); }
		});

		this.dispTotal = _createField('Ext.form.field.Display', {
			fieldLabel:'Total',
			name : 'total',
			style: { fontWeight: 'bold' },
			renderer: function(v, field){ return Ext.util.Format.number(v, '0,000.##'); }
		});

		this.calculateTotal = function(){
			var bForm = _this.getForm(),
				txtNet = _this.dispNet,
				txtDeliveryCost = bForm.findField('delivery_cost'),
				txtTotal = _this.dispTotal;
			var net = parseFloat(txtNet.getValue()),
				deliveryCost = txtDeliveryCost.getValue(),
				total = net + deliveryCost;
			txtTotal.setValue(total);
		};

		var formTotal = Ext.create('Ext.panel.Panel', {
			region: 'south',
			split: true,
			border: true,
			height: 100,
			bodyPadding: '5 0 0 0',
			defaults:{
				layout:'form',
				border:false,
				xtype:'panel',
				bodyStyle:'padding:0 22px 0 0'
			},
			items:[
				this.dispNet,
				_createField('BASE.field.NumericField', {
					fieldLabel:'Delivery cost',
					name : 'delivery_cost',
					allowBlank: true,
					value: 0,
					fieldStyle: 'text-align: left;',
					enableKeyEvents: true,
					listeners: {
						keyup: this.calculateTotal
					}
				}),
				this.dispTotal
			]
		});

		this.statusPanel = Ext.create('TCMS.Order.Status.Main', {
			region: 'east',
			width: 200,
			split: true
		});

		this.itemPanel = Ext.create('Ext.panel.Panel', {
			layout: 'border',
			region: 'center',
			border: false,
			items: [{
				xtype: 'panel',
				region: 'center',
				layout: 'border',
				border: false,
				items: [this.gridPanel, formTotal]
			},
			this.statusPanel
			]
		});

		this.items = [
			formMain,
			this.itemPanel
		];

		this.memberDialog = Ext.create('TCMS.MemberSize.Member.Window');

		// **** event
		this.triggerMember.onTriggerClick = function(){
			// show member dialog
			_this.memberDialog.openDialog('Select member', 'search');
		};

		var setAddress = function(o){
			var delData = null;
			if(o==null){
				_this.comboAddressType.setValue('0');
				delData = {
					address_line_1: null,
					address_line_2: null,
					address_city: null,
					address_state_province: null,
					address_zip: null,
					address_country: '221',
					address_phone: null
				};
			}else{
				/*
				var addrType = _this.comboAddressType.getValue(),
					userPrefix = (addrType=='1')?'primary_':'secondary_';
				delData = {
					address_line_1:			o[userPrefix+'address_line_1'],
					address_line_2:			o[userPrefix+'address_line_2'],
					address_city:			o[userPrefix+'address_city'],
					address_state_province:	o[userPrefix+'address_state_province'],
					address_zip:			o[userPrefix+'address_zip'],
					address_country:		o[userPrefix+'address_country']
				};
				*/
				delData = {
					address_name:			o['full_name'],
					address_line_1:			o['address_line_1'],
					address_line_2:			o['address_line_2'],
					address_city:			o['city'],
					address_state_province:	o['state'],
					address_zip:			o['zip'],
					address_country:		o['country'],
					address_phone:			o['phone']
				};
			}
			txtDelName			.setValue(delData['address_name']),
			txtDelAddress1		.setValue(delData['address_line_1']),
			txtDelAddress2		.setValue(delData['address_line_2']),
			txtDelCity			.setValue(delData['address_city']),
			txtDelState			.setValue(delData['address_state_province']),
			txtDelZip			.setValue(delData['address_zip']),
			_this.comboCountry	.setValue(delData['address_country']),
			txtDelPhone			.setValue(delData['address_phone']);
		};
		var resetAddress = function(){
			setAddress(null);
		};


		this.comboAddressType.on('change', function(combo, newValue, oldValue){
			var m = _this.form.findField('member_id').getValue();
			if(newValue=='1' || newValue=='2'){
				if(Ext.isEmpty(m)){
					Ext.Msg.show({
						title : "Error",
						msg : "Please select member",
						icon : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
					_this.triggerMember.focus();
					_this.comboAddressType.setValue('0');
				}else{
					_this.form.load({
						url : __site_url+'backend/member/LoadAddress',
						clientValidation : true,
						success : function(form, act) {
							_this.fireEvent('afterLoad', _this, act);
							var o = act.result.data;
							setAddress(o);
						},
						failure : _this.form.failureAlert,
						waitMsg : 'Loading...',
						waitTitle : 'Please wait...',
						params : {
							id: m,
							sequence: newValue
						}
					});
				}
			}
		});


		// **** member event
		this.memberDialog.submitAct.setHandler(function(){
			var record = _this.memberDialog.grid.getSelectedObject(),
				txtMemberFullname = _this.form.findField('member_fullname'),
				hdnMemberId = _this.form.findField('member_id');
			if(record){
				var memberObj = record.data;

				if(hdnMemberId.getValue()!=memberObj.id){
					resetAddress();
					hdnMemberId.setValue(memberObj.id);
					txtMemberFullname.setValue(memberObj.first_name+' '+memberObj.last_name);
				}

				_this.memberDialog.hide();
			}
		});

		this.memberDialog.grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!_this.memberDialog.submitAct.isDisabled())
				_this.memberDialog.submitAct.execute();
		});

		// *** ORDER ITEM

		this.gridPanel.addAct.setHandler(function(){
			_this.gridPanel.window.openDialog('Add item', 'add', _this.gridPanel.grid, {
				order_id: _this.formParams.id
			});
		});

		this.gridPanel.editAct.setHandler(function(){
			_this.gridPanel.window.openDialog('Edit item', 'edit', _this.gridPanel.grid, {
				id: _this.gridPanel.grid.getSelectedId(),
				order_id: _this.formParams.id
			});
		});

		// *** ORDER STATUS
		this.statusPanel.changeStatusAct.setHandler(function(){
			_this.statusPanel.window.openDialog('Change order status', 'edit', _this, {
				order_id: _this.formParams.id
			});
		});

		return this.callParent(arguments);
	},
	updateTotal: function(){
		var _this=this;
		//var order_id = this.formParams.id;
		//console.log(order_id);
		this.form.submit({
			url : this.getLoadUrl(),
			success : function(form, act) {
				if(act.result && act.result.data){
					var data = act.result.data;
					_this.dispNet.setValue(data.net);
					_this.dispTotal.setValue(data.total);

					_this.calculateTotal();
				}
			},
			failure : this.failureAlert,
			waitMsg : 'Saving...',
			waitTitle : 'Please wait...',
			params : this.getLoadParams()
		});
	}
});