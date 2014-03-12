Ext.define('TCMS.MemberSize.Form', {
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
					type: 'member_size'
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

		this.comboShoulderLevel = _createField('BASE.ComboStatic', {
			fieldLabel:'Level',
			name : 'shoulder_level',
			store:[
				['1', 'เท่ากัน'],
				['2', 'ซ้ายต่ำ'],
				['3', 'ขวาต่ำ']
			],
			allowBlank: true
		});

		this.comboShoulderShape = _createField('BASE.ComboStatic', {
			fieldLabel:'Shape',
			name : 'shoulder_shape',
			store:[
				['1', 'ไหล่ตั้ง'],
				['2', 'ไหล่เท'],
				['3', 'ไหล่ปกติ']
			],
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
				columnWidth:0.34,
				defaults:_fieldDefaults,
				items:[{
					name: 'name',
					xtype: 'textfield',
					fieldLabel: 'Name',
					allowBlank: false
				},
				this.triggerMember, {
					name: 'member_id',
					xtype: 'hiddenfield'
				},/*{
					name: 'member_fullname',
					xtype: 'displayfield',
					fieldLabel: 'Member'
				},*/
				this.comboSizeType,
				_createField('BASE.field.NumericField', { fieldLabel:'Collar', name : 'collar' }),
				_createField('BASE.field.NumericField', { fieldLabel:'Wrist', name : 'wrist' }),
				{
					xtype: 'fieldset',
					title: 'Shoulder',
					defaults: _fieldDefaults,
					items: [
						_createField('BASE.field.NumericField', { fieldLabel:'Shoulder', name : 'shoulder' }),
						_createField('BASE.field.NumericField', { fieldLabel:'Side', name : 'shoulder_side' }),
						this.comboShoulderShape,
						this.comboShoulderLevel,
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