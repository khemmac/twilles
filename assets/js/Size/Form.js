Ext.define('TCMS.Size.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'size'
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
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getDeleteParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getDeleteUrl: function(){ return __site_url+'backend/dao/delete'; }
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

		var _createSizeField = function(config){
			config = Ext.apply(config, {
				allowBlank: true,
				minValue: 0,
				value: 0
			});
			return Ext.create('TCMS.BaseMaster.field.Numeric', Ext.apply(config, _fieldDefaults));
		};

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
					xtype: 'fieldset',
					title: 'Size',
					defaults: _fieldDefaults,
					items: [{
						name: 'code',
						xtype: 'textfield',
						fieldLabel: 'Code',
						allowBlank: false
					}, {
						name: 'name',
						xtype: 'textfield',
						fieldLabel: 'Name',
						allowBlank: false
					}]
				}, {
					xtype: 'fieldset',
					title: 'Basic',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Collar', name: 'collar' }),
						_createSizeField({ fieldLabel: 'Biceps', name: 'biceps' }),
						_createSizeField({ fieldLabel: 'Elbow', name: 'elbow' }),
						_createSizeField({ fieldLabel: 'Wrist', name: 'wrist' }),
						_createSizeField({ fieldLabel: 'Armhole', name: 'armhole' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Chest',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Front', name: 'chest_front' }),
						_createSizeField({ fieldLabel: 'Back', name: 'chest_back' }),
						_createSizeField({ fieldLabel: 'Front piece', name: 'chest_frontpiece' }),
						_createSizeField({ fieldLabel: 'Back piece', name: 'chest_backpiece' }),
						_createSizeField({ fieldLabel: 'Height', name: 'chest_height' }),
						_createSizeField({ fieldLabel: 'Distance', name: 'chest_distance' })
					]
				}
				]
			},{
				// center column
				// defaults for fields
				defaults:_fieldDefaults,
				items:[{
					xtype: 'fieldset',
					title: 'Shoulder',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Shoulder', name: 'shoulder' }),
						_createSizeField({ fieldLabel: 'Center', name: 'shoulder_center' }),
						_createSizeField({ fieldLabel: 'Side', name: 'shoulder_side' })
					]
				}, {
					xtype: 'fieldset',
					title: 'Waist',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Front piece', name: 'waist_frontpiece' }),
						_createSizeField({ fieldLabel: 'Back piece', name: 'waist_backpiece' })
					]
				},{
					xtype: 'fieldset',
					title: 'Hips',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Front piece', name: 'hips_frontpiece' }),
						_createSizeField({ fieldLabel: 'Back piece', name: 'hips_backpiece' })
					]
				},{
					xtype: 'fieldset',
					title: 'Lenngth in',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Front', name: 'length_in_front' }),
						_createSizeField({ fieldLabel: 'Back', name: 'length_in_back' })
					]
				},{
					xtype: 'fieldset',
					title: 'Sleeve',
					defaults: _fieldDefaults,
					items: [
						_createSizeField({ fieldLabel: 'Left', name: 'sleeve_left' }),
						_createSizeField({ fieldLabel: 'Right', name: 'sleeve_right' })
					]
				}]
			}]
		}];

		return this.callParent(arguments);
	}
});