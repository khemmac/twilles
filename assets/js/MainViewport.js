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
				columns: 3,
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
				},{
					text: 'Inventory', iconCls: 'menu-small-inventory',
					hrefTarget: '_self',
					href: __site_url+'cms/inventory'
				}]
			},{
				xtype: 'buttongroup',
				columns: 3,
				title: 'Style data',
				padding:'6 0 5 0',
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