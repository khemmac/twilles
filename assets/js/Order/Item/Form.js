Ext.define('TCMS.Order.Item.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		Ext.apply(this, {
			bodyStyle : 'padding:5px 0px 0px 0px;',
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

				o.is_active = (o.is_active && o.is_active=='on')?1:0;
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.formAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; }
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

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
			allowBlank: false
		}, _fieldDefaults));

		this.comboInventoryPackage = _createField('TCMS.BaseMaster.field.ComboInventory', {
			fieldLabel: 'Package',
			name : 'inventory_packaging_id',
			inventoryType: '4',
			allowBlank: true
		});

		this.items = [{
			// column layout with 2 columns
			layout:'column',
			border:false,
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
					name: 'code',
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
							_this.form.findField('order_complete_date').setValue(Ext.Date.add(val, Ext.Date.DAY, 7));
						}
					}
				}, {
					name: 'order_complete_date',
					xtype: 'datefield',
					fieldLabel: 'Complete date',
					allowBlank: false,
					value: new Date(),
					format:'d/m/Y',
					altFormats:'Y-m-d|Y-m-d H:i:s|d/m/Y',
					submitFormat:'Y-m-d',
					editable: false,
					value: Ext.Date.add(new Date(), Ext.Date.DAY, 7)
				},/* {
					name: 'create_date',
					xtype: 'displayfield',
					fieldLabel: 'Order date',
					value: Ext.Date.format(new Date(), 'Y-m-d H:i:s'),
					renderer: function(v, field){
						return (v)?Ext.Date.format(Ext.Date.parse(v, 'Y-m-d H:i:s'), 'd/m/Y'):'-';
					}
				},*/
				]
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
		}];

		return this.callParent(arguments);
	}
});