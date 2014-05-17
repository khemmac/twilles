Ext.define('TCMS.Order.Item.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		Ext.apply(this, {
			layout: 'border',
			border: false,
			bodyPadding : '',
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
					type: 'order_item'
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.formAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
					type: 'v_order_item'
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getDeleteUrl: function(){ return __site_url+'backend/dao/delete'; },
			getDeleteParams : function() {
				return Ext.apply({
					type: 'order_item'
				}, this.formParams);
			}
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

		// **************** SIZE ****************

		this.triggerMemberSize = _createField('Ext.form.field.Trigger', {
			fieldLabel:'Member size',
			name : 'member_size_name',
			editable: false,
			triggerCls: 'x-form-search-trigger',
			allowBlank: true,
			submitValue: false
		});

		this.comboSizeType = _createField('BASE.ComboStatic', {
			fieldLabel:'Size type',
			name : 'size_type',
			store:[
				['1', 'Style Consultant'],
				['2', 'Measure Yourself'],
				['3', 'Measure Your Shirt'],
				['4', 'Send Us Your Shirt'],
				['5', 'Standard Size']
			]
		});

		var comboShoulderLevel = _createField('BASE.ComboStatic', {
			fieldLabel:'Level',
			name : 'shoulder_level',
			store:[
				['1', 'เท่ากัน'],
				['2', 'ซ้ายต่ำ'],
				['3', 'ขวาต่ำ']
			],
			allowBlank: true
		});

		var comboShoulderShape = _createField('BASE.ComboStatic', {
			fieldLabel:'Shape',
			name : 'shoulder_shape',
			store:[
				['1', 'ไหล่ตั้ง'],
				['2', 'ไหล่เท'],
				['3', 'ไหล่ปกติ']
			],
			allowBlank: true
		});

		var tabSize = [{
			xtype: 'hidden',
			name: 'member_size_id'
		}, {
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
				columnWidth:0.34,
				defaults:_fieldDefaults,
				items:[
				this.triggerMemberSize,
				//this.comboSizeType,
				{
					xtype: 'fieldset',
					title: 'Basic',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Collar', name : 'collar' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Wrist', name : 'wrist' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Shoulder',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Shoulder', name : 'shoulder' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Side', name : 'shoulder_side' }),
						comboShoulderShape,
						comboShoulderLevel,
						_createField('BASE.field.NumericField', { fieldLabel:'Slope', name : 'shoulder_slope' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Waist',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Waist', name : 'waist' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Buffer', name : 'waist_buffer' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Front piece', name : 'waist_frontpiece' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Back piece', name : 'waist_backpiece' })
					]
				}
				]
			},{
				// column 2
				// defaults for fields
				columnWidth:0.33,
				defaults:_fieldDefaults,
				items:[{
					xtype: 'fieldset',
					title: 'Chest',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Chest', name : 'chest' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Buffer', name : 'chest_buffer' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Front', name : 'chest_front' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Back', name : 'chest_back' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Distance', name : 'chest_distance' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Front piece', name : 'chest_frontpiece' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Back piece', name : 'chest_backpiece' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Hips',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Hips', name : 'hips' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Buffer', name : 'hips_buffer' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Front piece', name : 'hips_frontpiece' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Back piece', name : 'hips_backpiece' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Sleeve',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Left', name : 'sleeve_left' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Right', name : 'sleeve_right' })
					]
				}]
			},{
				// column 3
				// defaults for fields
				columnWidth:0.33,
				defaults:_fieldDefaults,
				items:[{
					xtype: 'fieldset',
					title: 'Length',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'In front', name : 'length_in_front' }),
						_createField('BASE.field.NumericField', { fieldLabel:'In back', name : 'length_in_back' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Out front', name : 'length_out_front' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Out back', name : 'length_out_back' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Biceps',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Biceps', name : 'biceps' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Buffer', name : 'biceps_buffer' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Elbow',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Elbow', name : 'elbow' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Buffer', name : 'elbow_buffer' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Armhole',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Armhole', name : 'armhole' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Buffer', name : 'armhole_buffer' })
					]
				}]
			}]
		}];

		// **************** STYLE ****************

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
			name : 'inventory_package_id',
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
		this.comboFabricBody = _createField('TCMS.BaseMaster.field.ComboFabric', {
			fieldLabel: 'Body',
			name : 'fabric_body_id',
			allowBlank: false
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

		var tabFabric = [{
			// column layout with 2 columns
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
				columnWidth:0.33,
				defaults:_fieldDefaults,
				items:[
				_createField('BASE.field.NumericField', {
					fieldLabel:'Amount',
					name : 'item_amount',
					allowBlank: false,
					value: 1,
					minValue: 1
				}),{
					xtype: 'fieldset',
					title: 'Fabric',
					defaults: _fieldDefaults,
					items: [
						this.comboFabricCollarInner,
						this.comboFabricCollarOuter,
						this.comboFabricBody,
						this.comboFabricPlacket,
						this.comboFabricCuffInner,
						this.comboFabricCuffOuter
					]
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
				columnWidth:0.34,
				defaults:_fieldDefaults,
				items:[{
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
				{
					name: 'detail',
					xtype: 'textarea',
					fieldLabel: 'Other',
					labelAlign: 'top',
					rows: 10
				}]
			},{
				// right column
				// defaults for fields
				columnWidth:0.33,
				defaults:_fieldDefaults,
				items:[{
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
				}]
			}]
		}];

		this.items = [Ext.create('Ext.tab.Panel', {
			region: 'center',
			border: false,
			items: [{
				title: 'Fabric',
				border: true,
				bodyPadding: '5 0 0 10',
				items: tabFabric
		    }, {
				title: 'Size',
				border: true,
				bodyPadding: '5 0 0 10',
				items: tabSize
			}]
		})];

		this.memberSizeDialog = Ext.create('TCMS.MemberSize.Selector.Window');

		// event
		this.triggerMemberSize.onTriggerClick = function(){
			// show member dialog
			_this.memberSizeDialog.openDialog('Select member size', 'search');
		};

		// member size event
		this.memberSizeDialog.submitAct.setHandler(function(){
			var record = _this.memberSizeDialog.grid.getSelectedObject();
			if(record){
				var o = record.data;

				// loop through fields
				var fObj = _this.form.getFields();
				for(var i=0;i<fObj.items.length;i++){
					var f = fObj.items[i],
						isExist = false;
					for(var k in o){
						if(f.name==k){
							_this.form.findField(f.name).setValue(o[k]+'');
							break;
						}
					}
				}

				_this.form.findField('member_size_name').setValue(o.name);
				_this.form.findField('member_size_id').setValue(o.id);
				_this.memberSizeDialog.hide();
			}
		});

		this.memberSizeDialog.grid.on('celldblclick', function(g, td, cellIndex, r) {
			if(!_this.memberSizeDialog.submitAct.isDisabled())
				_this.memberSizeDialog.submitAct.execute();
		});

		return this.callParent(arguments);
	}
});