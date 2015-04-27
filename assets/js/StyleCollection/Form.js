Ext.define('TCMS.StyleCollection.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'inventory'
		});

		Ext.apply(this, {
			border: false,
			bodyPadding: '0 0 0 0',
			layout: 'border',
			autoScroll: false,
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
			getSaveUrl: function(){ return __site_url+'backend/style_collection/'+((_this.formAction == "add")?'insert':'update'); },
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
			labelWidth: 70
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
			inventoryType: '3',
			allowBlank: true
		});
		this.comboInventoryPackage = _createField('TCMS.BaseMaster.field.ComboInventory', {
			fieldLabel: 'Package',
			name : 'inventory_packaging_id',
			inventoryType: '4',
			allowBlank: true
		});
		// ** END PLACKET **

		// ** FABRIC **
		this.comboFabricCollarInner = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Inner collar',
			name : 'fabric_collar_inner_id',
			allowBlank: true
		});
		this.comboFabricCollarOuter = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Outer collar',
			name : 'fabric_collar_outer_id',
			allowBlank: true
		});
		this.comboFabricBody = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Body',
			name : 'fabric_body_id',
			allowBlank: true
		});
		this.comboFabricPlacket = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Placket',
			name : 'fabric_placket_id',
			allowBlank: true
		});
		this.comboFabricCuffInner = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Inner Cuff',
			name : 'fabric_cuff_inner_id',
			allowBlank: true
		});
		this.comboFabricCuffOuter = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Outer cuff',
			name : 'fabric_cuff_outer_id',
			allowBlank: true
		});
		// ** END FABRIC **

		// ** Upload file
		var createUploadFile = function(options){
			return _createField('Ext.form.FieldContainer', {
				layout: 'hbox',
				fieldLabel: options.fieldLabel,
				combineErrors: false,
				anchor: '100%',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'filefield',
					emptyText: 'Select a photo',
					name: options.name,
					buttonText: 'Select...',
					width:250
				},  {
					xtype: 'displayfield',
					value: '&nbsp;&nbsp;'+options.size+' pixel'
				}]
			});
		};

		var ulFront = createUploadFile({ name: 'photo_main', size: '880x200', fieldLabel: 'Main' });
		var ulT1 = createUploadFile({ name: 'photo_1_thumbnail', size: '126x190', fieldLabel: 'Thumbnail 1' });
		var ulF1 = createUploadFile({ name: 'photo_1_full', size: '425x640', fieldLabel: 'Full 1' });
		var ulT2 = createUploadFile({ name: 'photo_2_thumbnail', size: '126x190', fieldLabel: 'Thumbnail 2' });
		var ulF2 = createUploadFile({ name: 'photo_2_full', size: '425x640', fieldLabel: 'Full 2' });
		var ulT3 = createUploadFile({ name: 'photo_3_thumbnail', size: '126x190', fieldLabel: 'Thumbnail 3' });
		var ulF3 = createUploadFile({ name: 'photo_3_full', size: '425x640', fieldLabel: 'Full 3' });
		var ulT4 = createUploadFile({ name: 'photo_4_thumbnail', size: '126x190', fieldLabel: 'Thumbnail 4' });
		var ulF4 = createUploadFile({ name: 'photo_4_full', size: '425x640', fieldLabel: 'Full 4' });
		var ulT5 = createUploadFile({ name: 'photo_5_thumbnail', size: '126x190', fieldLabel: 'Thumbnail 5' });
		var ulF5 = createUploadFile({ name: 'photo_5_full', size: '425x640', fieldLabel: 'Full 5' });
		var ulT6 = createUploadFile({ name: 'photo_6_thumbnail', size: '126x190', fieldLabel: 'Thumbnail 6' });
		var ulF6 = createUploadFile({ name: 'photo_6_full', size: '425x640', fieldLabel: 'Full 6' });
		// ** End Upload file

		this.tabForm = Ext.create('Ext.tab.Panel', {
			region: 'center',
			layout: 'border',
			border: false,
			items: [{
				title: 'Common',
				id: 'tab-common',
				border: false,
				bodyPadding: '5 0 0 10',
				items: [{
					// column layout with 2 columns
					//region: 'center',
					layout:'column',
					border:false,
					// defaults for columns
					defaults:{
						columnWidth:0.3,
						layout:'form',
						border:false,
						xtype:'panel',
						bodyStyle:'padding:0 22px 0 0'
					},
					items:[{
						// left column
						// defaults for fields
						columnWidth:0.34,
						defaults:_fieldDefaults,
						items:[{
							name: 'code',
							xtype: 'textfield',
							fieldLabel: 'Code',
							allowBlank: false
						},
						//this.comboStyleType,
						this.comboStyleGroup, {
							xtype: 'fieldset',
							title: 'Collar',
							defaults: _fieldDefaults,
							items: [this.comboPartCollar, this.comboPartCollarType, this.numberCollarWidth, {
								xtype:'textfield',
								name: 'part_collar_thickness',
								fieldLabel: 'Thickness'
							}, this.comboPartCollarStay]
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
						// center column
						// defaults for fields
						columnWidth:0.33,
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
							items: [this.comboPartCuff, this.comboPartCuffType, this.numberCuffWidth, {
								xtype:'textfield',
								name: 'part_cuff_thickness',
								fieldLabel: 'Thickness'
							}]
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
					},{
						// right column
						// defaults for fields
						columnWidth:0.33,
						defaults:_fieldDefaults,
						items:[{
							xtype: 'fieldset',
							title: 'Fabric',
							defaults: _fieldDefaults,
							items: [
								this.comboFabricCollarInner,
								this.comboFabricCollarOuter,
								//this.comboFabricPlacket,
								this.comboFabricBody,
								this.comboFabricCuffInner,
								this.comboFabricCuffOuter
							]
						}]
					}]
				}]
			}, {
				title: 'Photos',
				id: 'tab-1',
				border: true,
				bodyPadding: '5 0 0 10',
				defaults: _fieldDefaults,
				layout: 'form',
				items: [
					ulFront,
					ulT1,
					ulF1,
					ulT2,
					ulF2,
					ulT3,
					ulF3,
					ulT4,
					ulF4,
					ulT5,
					ulF5,
					ulT6,
					ulF6
				]
			}]
		});

		this.items = [
			this.tabForm
		];

		return this.callParent(arguments);
	}
});