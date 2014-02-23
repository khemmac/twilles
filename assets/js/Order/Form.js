Ext.define('TCMS.Order.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'inventory'
		});

		Ext.apply(this, {
			bodyStyle : 'padding:5px 0px 0px 0px;',
			autoScroll: true,
			plugins: [uxFormStatus],
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
			getSaveUrl: function(){ return __site_url+'backend/icode/'+((_this.formAction == "add")?'insert':'update'); },
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
			//anchor:'100%',
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
		this.comboStyleGroup = Ext.create('BASE.ComboAjax', Ext.apply({
			fieldLabel: 'Style group',
			name : 'style_group_id',
			proxyExtraParams: {
				type:'style_group'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: false
		}, _fieldDefaults));

		// ** COLLAR **
		this.comboPartCollar = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Collar',
			name : 'part_collar_id',
			partType: 'COLLAR',
			allowBlank: true
		});
		this.comboPartCollarType = _createField('BASE.ComboStatic', {
			fieldLabel:'Type',
			name : 'part_collar_type',
			store:[
				['1', 'ปกนูน'],
				['2', 'ปกธรรมดา']
			],
			allowBlank: true
		});
		this.numberCollarWidth = _createField('TCMS.BaseMaster.field.Numeric', {
			fieldLabel: 'Width',
			name: 'part_collar_width',
			allowBlank: true,
			minValue: 0,
			value: 0
		});
		this.comboPartCollarStay = _createField('BASE.ComboStatic', {
			fieldLabel:'Stay',
			name : 'part_collar_stay',
			store:[
				['1', 'Yes'],
				['0', 'No']
			],
			allowBlank: true
		});
		// ** END COLLAR **

		// ** CUFF **
		this.comboPartCuff = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Cuff',
			name : 'part_cuff_id',
			partType: 'CUFF',
			allowBlank: true
		});
		this.comboPartCuffType = _createField('BASE.ComboStatic', {
			fieldLabel:'Type',
			name : 'part_cuff_type',
			store:[
				['1', 'ข้อมือนูน'],
				['2', 'ข้อมือธรรมดา']
			],
			allowBlank: true
		});
		this.numberCuffWidth = _createField('TCMS.BaseMaster.field.Numeric', {
			fieldLabel: 'Width',
			name: 'part_cuff_width',
			allowBlank: true,
			minValue: 0,
			value: 0
		});
		this.numberCuffThickness = _createField('TCMS.BaseMaster.field.Numeric', {
			fieldLabel: 'Thickness',
			name: 'part_cuff_thickness',
			allowBlank: true
		});
		// ** END CUFF **

		// ** PLACKET **
		this.comboPartPlacket = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Placket',
			name : 'part_placket_id',
			partType: 'PLACKET',
			allowBlank: true
		});
		this.numberPlacketWidth = _createField('TCMS.BaseMaster.field.Numeric', {
			fieldLabel: 'Width',
			name: 'part_placket_width',
			allowBlank: true,
			minValue: 0,
			value: 0
		});
		// ** END PLACKET **

		this.comboPartPocket = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Pocket',
			name : 'part_pocket_id',
			partType: 'POCKET',
			allowBlank: true
		});
		this.comboPartYoke = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Yoke',
			name : 'part_yoke_id',
			partType: 'YOKE',
			allowBlank: true
		});
		this.comboPartPleat = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Pleat',
			name : 'part_pleat_id',
			partType: 'PLEAT',
			allowBlank: true
		});
		this.comboPartBottom = _createField('TCMS.BaseMaster.field.ComboPart', {
			fieldLabel: 'Bottom',
			name : 'part_bottom_id',
			partType: 'BOTTOM',
			allowBlank: true
		});

		this.comboStitchingType = _createField('BASE.ComboStatic', {
			fieldLabel:'Stitching',
			name : 'stitching_type',
			store:[
				['1', 'เย็บริม'],
				['2', 'เย็บธรรมดา']
			],
			allowBlank: true
		});

		// ** INVENTORY **
		this.comboInventoryButton = _createField('TCMS.BaseMaster.field.ComboInventory', {
			fieldLabel: 'Button',
			name : 'inventory_button_id',
			inventoryType: '1',
			allowBlank: true
		});
		this.comboInventoryLabel = _createField('TCMS.BaseMaster.field.ComboInventory', {
			fieldLabel: 'Label',
			name : 'inventory_label_id',
			inventoryType: '2',
			allowBlank: true
		});
		this.comboInventoryPackage = _createField('TCMS.BaseMaster.field.ComboInventory', {
			fieldLabel: 'Package',
			name : 'inventory_packaging_id',
			inventoryType: '4',
			allowBlank: true
		});
		// ** END PLACKET **


		this.items = [{
			// column layout with 2 columns
			layout:'column',
			border:false,
			// defaults for columns
			defaults:{
				columnWidth:0.5,
				layout:'form',
				border:false,
				xtype:'panel',
				bodyStyle:'padding:0 22px 0 0'
			},
			items:[{
				// left column
				// defaults for fields
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
				//this.comboStyleType,
				this.comboStyleGroup, {
					xtype: 'fieldset',
					title: 'Collar',
					defaults: _fieldDefaults,
					items: [this.comboPartCollar, this.comboPartCuffType, this.numberCollarWidth, this.comboPartCollarStay]
				}, {
					xtype: 'fieldset',
					title: 'Placket',
					defaults: _fieldDefaults,
					items: [this.comboPartPlacket, this.numberPlacketWidth]
				},
				this.comboStitchingType, {
					xtype: 'fieldset',
					title: 'Inventory',
					defaults: _fieldDefaults,
					items: [this.comboInventoryButton, this.comboInventoryLabel, this.comboInventoryPackage]
				}]
			},{
				// right column
				// defaults for fields
				defaults:_fieldDefaults,
				items:[{
					name: 'description',
					xtype: 'textarea',
					fieldLabel: 'Detail',
					rows: 3
				}, {
					xtype: 'fieldset',
					title: 'Cuff',
					defaults: _fieldDefaults,
					items: [this.comboPartCuff, this.comboPartCollarType, this.numberCuffWidth, this.numberCuffThickness]
				}, {
					xtype: 'fieldset',
					title: 'Other parts',
					defaults: _fieldDefaults,
					items: [
						this.comboPartPocket,
						this.comboPartYoke,
						this.comboPartPleat,
						this.comboPartBottom
					]
				}, {
					name: 'remark',
					xtype: 'textarea',
					fieldLabel: 'Remark',
					rows: 3
				}, {
					name: 'is_active',
					xtype: 'checkboxfield',
					fieldLabel: 'Active',
					checked: !0
				}]
			}]
		}];

		return this.callParent(arguments);
	}
});