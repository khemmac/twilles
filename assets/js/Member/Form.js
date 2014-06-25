Ext.define('TCMS.Member.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		Ext.apply(this, {
			layout: 'border',
			border: false,
			bodyPadding : '',
			autoScroll: false,
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
				//o.active = (o.active && o.active=='on')?1:0;
				return o;
			},
			getSaveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSaveUrl: function(){ return __site_url+'backend/member/'+((_this.formAction == "add")?'insert':'update'); },
			getLoadParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getLoadUrl: function(){ return __site_url+'backend/member/load'; },
			getDeleteUrl: function(){ return __site_url+'backend/member/delete'; },
			getDeleteParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSetActiveParams : function() {
				return Ext.apply({
				}, this.formParams);
			},
			getSetActiveUrl : function() {
				return __site_url+'backend/member/setActive';
			},
			setActive : function() {
				var _this = this;
				var url = this.getSetActiveUrl();
				_this.form.load({
					url : url,
					clientValidation : true,
					success : function(form, act) {
						_this.fireEvent('afterSetActive', _this, act);
					},
					failure : _this.failureAlert,
					waitMsg : 'Changing status...',
					waitTitle : 'Please wait...',
					params : _this.getSetActiveParams()
				});
			}
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		var _fieldDefaults = {
			labelAlign: 'right',
			width: 300,
			labelWidth: 90
		};
		var _fieldDefaultsTab = {
			labelAlign: 'right',
			anchor:'100%',
			labelWidth: 90
		};

		var _createField = function(ns, config){
			return Ext.create(ns, Ext.apply(config, _fieldDefaults));
		};

		// **************** TAB MEMBER ****************
		this.comboRole = _createField('BASE.ComboStatic', {
			fieldLabel:'User type',
			name : 'group',
			store:[
				[1, 'Admin'],
				[2, 'Member']
			]
		});
		var tabMember = [
		this.comboRole,
		{
			name: 'email',
			xtype: 'textfield',
			fieldLabel: 'Email',
			allowBlank: false,
			vtype: 'email'
		}/*, {
			name: 'username',
			xtype: 'textfield',
			fieldLabel: 'Username',
			allowBlank: false,
			maxLength: 100
		}*/, {
			name: 'password',
			xtype: 'textfield',
			fieldLabel: 'Password',
			allowBlank: true
		}, {
			name: 'first_name',
			xtype: 'textfield',
			fieldLabel: 'First name',
			allowBlank: false
		}, {
			name: 'last_name',
			xtype: 'textfield',
			fieldLabel: 'Last name',
			allowBlank: false
		}/*, {
			xtype: 'fieldcontainer',
			fieldLabel: 'Mobile',
			layout: 'hbox',
			defaults: _fieldDefaults,
			defaultType: 'textfield',
			items: [{
				width: 40,
				name: 'mobile_number_country',
				hideLabel: true,
				allowBlank: true,
				maxLength:10
			}, {
				flex: 1,
				name: 'mobile_number',
				hideLabel: true,
				allowBlank: true,
				margins: '0 0 0 5',
				maxLength:15
			}, {
				width: 40,
				name: 'mobile_number_ext',
				hideLabel: true,
				margins: '0 0 0 5',
				maxLength:10
			}]
		}, {
			name: 'phone',
			xtype: 'textfield',
			fieldLabel: 'Phone',
			allowBlank: true,
			maxLength: 20
		}*/, {
			name: 'last_login',
			xtype: 'displayfield',
			fieldLabel: 'Last login',
			renderer: function(v){
				if(v){
					var d = new Date(v*1000);
					return Ext.Date.format(d, 'j M Y H:i:s');
				}else
					return '-';
			}
		}/*, {
			name: 'active',
			xtype: 'checkboxfield',
			fieldLabel: 'Active',
			checked: !0
		}*/];

		// **************** TAB ADDRESS ****************
		var tabAddress1 = [{
			xtype: 'textfield',
			fieldLabel:'Full name',
			name : 'primary_address_fullname',
			allowBlank: false
		},{
			name: 'primary_address_line_1',
			xtype: 'textarea',
			fieldLabel: 'Address line 1',
			//labelAlign: 'top',
			rows: 3,
			allowBlank: false
		}, {
			name: 'primary_address_line_2',
			xtype: 'textarea',
			fieldLabel: 'Address line 2',
			//labelAlign: 'top',
			rows: 3
		}, {
			xtype: 'textfield',
			fieldLabel:'City',
			name : 'primary_address_city',
			allowBlank: false
		}, {
			xtype: 'textfield',
			fieldLabel:'Province',
			name : 'primary_address_state_province',
			allowBlank: false
		}, {
			xtype: 'textfield',
			fieldLabel:'Zip',
			name : 'primary_address_zip',
			maxLength:15,
			allowBlank: false

		}, Ext.create('BASE.ComboAjax', Ext.apply({
			fieldLabel: 'Country',
			name : 'primary_address_country',
			proxyExtraParams: {
				type:'country'
			},
			value: '221',
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: false
		}, _fieldDefaults)),
		{
			xtype: 'textfield',
			fieldLabel:'Phone',
			name : 'primary_address_phone',
			allowBlank: true
		}];

		var tabAddress2 = [{
			xtype: 'textfield',
			fieldLabel:'Full name',
			name : 'secondary_address_fullname',
			allowBlank: true
		},{
			name: 'secondary_address_line_1',
			xtype: 'textarea',
			fieldLabel: 'Address line 1',
			//labelAlign: 'top',
			rows: 3,
			allowBlank: true
		}, {
			name: 'secondary_address_line_2',
			xtype: 'textarea',
			fieldLabel: 'Address line 2',
			//labelAlign: 'top',
			rows: 3
		}, {
			xtype: 'textfield',
			fieldLabel:'City',
			name : 'secondary_address_city',
			allowBlank: true
		}, {
			xtype: 'textfield',
			fieldLabel:'Province',
			name : 'secondary_address_state_province',
			allowBlank: true
		}, {
			xtype: 'textfield',
			fieldLabel:'Zip',
			name : 'secondary_address_zip',
			maxLength:15

		}, Ext.create('BASE.ComboAjax', Ext.apply({
			fieldLabel: 'Country',
			name : 'secondary_address_country',
			proxyExtraParams: {
				type:'country'
			},
			proxySorters: [{property: 'name', direction: 'ASC'}],
			allowBlank: true
		}, _fieldDefaults)),
		{
			xtype: 'textfield',
			fieldLabel:'Phone',
			name : 'secondary_address_phone',
			allowBlank: true
		}];

		this.tabForm = Ext.create('Ext.tab.Panel', {
			region: 'center',
			border: false,
			defaults:_fieldDefaults,
			items: [{
				title: 'Member',
				id: 'tab-member',
				border: true,
				bodyPadding: '5 0 0 10',
				defaults: _fieldDefaults,
				items: tabMember
			}, {
				title: 'Address 1',
				id: 'tab-address1',
				border: true,
				bodyPadding: '5 0 0 10',
				defaults: _fieldDefaults,
				items: tabAddress1
			}, {
				title: 'Address 2',
				id: 'tab-address2',
				border: true,
				bodyPadding: '5 0 0 10',
				defaults: _fieldDefaults,
				items: tabAddress2
			}]
		});

		this.items = [this.tabForm];

		// event
		this.on('afterLoad', function(form, act){
			var data = act.result.data;

			_this.comboRole.setDisabled(false);
			if(data.id==1){
				_this.comboRole.setDisabled(true);
			}
		});


		return this.callParent(arguments);
	}
});