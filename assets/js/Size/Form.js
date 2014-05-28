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
					xtype: 'textfield',
					fieldLabel: 'Code',
					allowBlank: false
				}, {
					name: 'name',
					xtype: 'textfield',
					fieldLabel: 'Name',
					allowBlank: false
				},
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Collar',
					name: 'collar',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Shoulder',
					name: 'shoulder',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Chest',
					name: 'chest',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Waist',
					name: 'waist',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Hips',
					name: 'hips',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Length in',
					name: 'length_in',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Length out',
					name: 'length_out',
					allowBlank: true,
					minValue: 0,
					value: 0
				})
				]
			},{
				// center column
				// defaults for fields
				defaults:_fieldDefaults,
				items:[
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Left sleeve',
					name: 'sleeve_left',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Right sleeve',
					name: 'sleeve_right',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Biceps',
					name: 'biceps',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Elbow',
					name: 'elbow',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Wrist',
					name: 'wrist',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Chest height',
					name: 'chest_height',
					allowBlank: true,
					minValue: 0,
					value: 0
				}),
				_createField('TCMS.BaseMaster.field.Numeric', {
					fieldLabel: 'Chest distance',
					name: 'chest_distance',
					allowBlank: true,
					minValue: 0,
					value: 0
				})]
			}]
		}];

		return this.callParent(arguments);
	}
});