Ext.define('TCMS.MainViewport', {
	extend	: 'Ext.Viewport',

	layout: {
		type: 'border',
		padding: 5
	},
	defaults: {
		split: true
	},

	constructor:function(config) {

		return this.callParent(arguments);
	},
	initComponent : function() {

		var northPanel = new Ext.Panel({
			region: 'north',
			border: false,
			tbar: [{
				xtype: 'buttongroup',
				columns: 4,
				title: 'Master data',
				items: [{
					text: 'Fabric',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-fabric',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/fabric'
				},{
					text: 'Standard size',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-size-model',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/size'
				},{
					text: 'Fabric type', iconCls: 'menu-small-fabric_type',
					hrefTarget: '_self',
					href: __site_url+'cms/fabric_type'
				},{
					text: 'Color', iconCls: 'menu-small-color',
					hrefTarget: '_self',
					href: __site_url+'cms/color'
				},{
					text: 'Pattern', iconCls: 'menu-small-pattern',
					hrefTarget: '_self',
					href: __site_url+'cms/pattern'
				},{
					text: 'Texture', iconCls: 'menu-small-texture',
					hrefTarget: '_self',
					href: __site_url+'cms/texture'
				},{
					text: 'Supplier', iconCls: 'menu-small-supplier',
					hrefTarget: '_self',
					href: __site_url+'cms/supplier'
				},{
					text: 'Thread count', iconCls: 'menu-small-thread_count',
					hrefTarget: '_self',
					href: __site_url+'cms/thread_count'
				}]
			},{
				xtype: 'buttongroup',
				columns: 3,
				title: 'Style data',
				//padding:'6 0 5 0',
				items: [{
					text: 'Style collection',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-shirt',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/style_collection'
				},{
					text: 'Trend style collection',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-t-shirt_yellow',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/trend_style_collection'
				},{
					text: 'Part style', iconCls: 'menu-small-zip',
					hrefTarget: '_self',
					href: __site_url+'cms/part_style'
				},{
					text: 'Style group', iconCls: 'menu-small-t_shirt_print',
					hrefTarget: '_self',
					href: __site_url+'cms/style_group'
				},{
					text: 'Inventory', iconCls: 'menu-small-inventory',
					hrefTarget: '_self',
					href: __site_url+'cms/inventory'
				}]
			},{
				xtype: 'buttongroup',
				columns: 2,
				title: 'Member',
				padding:'6 0 5 0',
				items: [{
					text: 'Member',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-userconfig',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/member'
				}, {
					text: 'Member size',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-package_utilities',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/member_size'
				}]
			},{
				xtype: 'buttongroup',
				columns: 3,
				title: 'Order',
				padding:'6 0 5 0',
				items: [{
					text: 'Order',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-order-history',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/order'
				},{
					text: 'Order confirm',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-large-money',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/order_confirm'
				},{
					text: 'Promotion',
					scale: 'large',
					rowspan: 3, iconCls: 'menu-voucher',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/promotion'
				}]
			},{
				xtype: 'buttongroup',
				columns: 2,
				title: 'Appointments',
				padding:'6 0 5 0',
				items: [{
					text: 'Appointment',
					scale: 'large',
					rowspan: 1, iconCls: 'menu-large-appointment',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/appointment'
				}, {
					text: 'Send shirt',
					scale: 'large',
					rowspan: 1, iconCls: 'menu-large-send-user',
					iconAlign: 'top',
					cls: 'x-btn-as-arrow',
					hrefTarget: '_self',
					href: __site_url+'cms/send_shirt'
				}]
			}/*,{
				xtype: 'buttongroup',
				columns: 3,
				title: 'Style data',
                layout: {
                    type: 'hbox',
                    padding:'5 3 4 3',
                    align:'stretch'
                },
				items: [{
						text: 'Style collection',
						scale: 'large',
						iconCls: 'menu-large-shirt',
						iconAlign: 'top',
						cls: 'x-btn-as-arrow',
						hrefTarget: '_self',
						href: __site_url+'cms/style_collection',
						columns: 3
					},{
						text: 'Trend style collection',
						scale: 'large',
						iconCls: 'menu-t-shirt_yellow',
						iconAlign: 'top',
						cls: 'x-btn-as-arrow',
						hrefTarget: '_self',
						href: __site_url+'cms/trend_style_collection'
					},{
						text: 'Part style',
						scale: 'large',
						iconCls: 'menu-large-part_style',
						iconAlign: 'top',
						cls: 'x-btn-as-arrow',
						hrefTarget: '_self',
						href: __site_url+'cms/part_style'
					},{
						text: 'Style group',
						scale: 'large',
						iconCls: 'menu-large-t-shirt',
						iconAlign: 'top',
						cls: 'x-btn-as-arrow',
						hrefTarget: '_self',
						href: __site_url+'cms/style_group'
					}]
			}*/]
		});

		this.items.push(northPanel);


		return this.callParent(arguments);
	}
});