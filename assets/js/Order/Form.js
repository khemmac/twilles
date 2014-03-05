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
					child.query('.field').forEach(function(c){
						if(c.xtype=='combobox' && Ext.isEmpty(o[c.name])){

							delete o[c.name];
							return false;
						}
					});
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

		this.itemPanel = Ext.create('TCMS.Order.Item.Main', {
			region: 'center',
			title: 'Order item'
		});
/*
		this.itemPanel = Ext.create('TCMS.Order.Item.Main', {
			region: 'center',
			border: true//,
			//tbar: [addAct, editAct, deleteAct],
			//validateActions : [addAct, editAct, deleteAct]
		});
*/
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

		this.items = [formMain, this.itemPanel];

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

		return this.callParent(arguments);
	}
});