Ext.define('TCMS.Member.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		var uxFormStatus = Ext.create('BASE.ux.FormStatus', {
			moduleType: 'inventory'
		});

		Ext.apply(this, {
			layout: 'border',
			border: false,
			bodyPadding : '',
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
				o.active = (o.active && o.active=='on')?1:0;
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
				name: 'username',
				xtype: 'textfield',
				fieldLabel: 'Username',
				allowBlank: false,
				maxLength: 100
			}, {
				name: 'password',
				xtype: 'textfield',
				fieldLabel: 'Password',
				allowBlank: true
			}, {
				name: 'email',
				xtype: 'textfield',
				fieldLabel: 'Email',
				allowBlank: false
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
			}, {
				name: 'phone',
				xtype: 'textfield',
				fieldLabel: 'Phone',
				allowBlank: true,
				maxLength: 20
			}, {
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
			}, {
				name: 'active',
				xtype: 'checkboxfield',
				fieldLabel: 'Active',
				checked: !0
			}];

		// **************** TAB ADDRESS ****************
		var tabAddress = [{
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
				columnWidth:0.5,
				defaults:_fieldDefaults,
				items:[{
					xtype: 'textfield',
					fieldLabel:'Name',
					name : 'address_name',
					allowBlank: false
				}, {
					xtype: 'textfield',
					fieldLabel:'Delivery name',
					name : 'fullname',
					allowBlank: false
				}, {
					name: 'address1',
					xtype: 'textarea',
					fieldLabel: 'Address 1',
					//labelAlign: 'top',
					rows: 3
				}, {
					name: 'address2',
					xtype: 'textarea',
					fieldLabel: 'Address 2',
					//labelAlign: 'top',
					rows: 3
				}]
			},{
				// right column
				// defaults for fields
				columnWidth:0.5,
				defaults:_fieldDefaults,
				items:[{
					name: 'address1',
					xtype: 'textarea',
					fieldLabel: 'Address 1',
					labelAlign: 'top',
					rows: 3
				}, {
					name: 'address2',
					xtype: 'textarea',
					fieldLabel: 'Address 2',
					labelAlign: 'top',
					rows: 3
				}]
			}]
		}];

		this.items = [Ext.create('Ext.tab.Panel', {
			region: 'center',
			border: false,
			items: [{
				title: 'Member',
				border: true,
				bodyPadding: '5 0 0 10',
				defaults: _fieldDefaults,
				items: tabMember
		    }, {
				title: 'Address',
				border: true,
				bodyPadding: '5 0 0 10',
				defaults: _fieldDefaults,
				items: tabAddress
			}]
		})];

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