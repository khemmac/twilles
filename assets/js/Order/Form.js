Ext.define('TCMS.Order.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		Ext.apply(this, {
			bodyPadding : false,
			layout: 'border',
			autoScroll: true,
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
		this.comboCountry = Ext.create('BASE.ComboAjax', Ext.apply({
			fieldLabel: 'Country',
			name : 'delivery_country_id',
			proxyExtraParams: {
				type:'country'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: true
		}, _fieldDefaults));

		this.comboInventoryPackage = _createField('TCMS.BaseMaster.field.ComboInventory', {
			fieldLabel: 'Package',
			name : 'inventory_packaging_id',
			inventoryType: '4',
			allowBlank: true
		});

		this.triggerMember = _createField('Ext.form.field.Trigger', {
			fieldLabel:'Member',
			name : 'member_fullname',
			editable: false,
			triggerCls: 'x-form-search-trigger',
			allowBlank: false,
			submitValue: false
		});

		var formMain = Ext.create('Ext.panel.Panel', {
			region: 'north',
			split: true,
			border: true,
			height: 160,
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
							columnWidth:0.5,
							defaults:_fieldDefaults,
							items:[{
								name: 'delivery_name',
								xtype: 'textfield',
								fieldLabel: 'Name'
							}, {
								name: 'delivery_zipcode',
								xtype: 'textfield',
								fieldLabel: 'Zip code',
								maxLength: 5
							},
							this.comboCountry,
							this.comboInventoryPackage]
						},{
							// delivery left column
							columnWidth:0.5,
							defaults:_fieldDefaults,
							items:[{
								name: 'delivery_address1',
								xtype: 'textarea',
								fieldLabel: 'Address 1',
								rows: 2
							}, {
								name: 'delivery_address2',
								xtype: 'textarea',
								fieldLabel: 'Address 2',
								rows: 2
							}]
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
			height: 120,
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

		// event
		this.triggerMember.onTriggerClick = function(){
			// show member dialog
			_this.memberDialog.openDialog('Select member', 'search');
		};

		// member event
		this.memberDialog.submitAct.setHandler(function(){
			var record = _this.memberDialog.grid.getSelectedObject();
			if(record){
				var memberObj = record.data;
				_this.form.findField('member_fullname').setValue(memberObj.first_name+' '+memberObj.last_name);
				_this.form.findField('member_id').setValue(memberObj.id);
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