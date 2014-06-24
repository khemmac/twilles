Ext.define('TCMS.StyleGroup.Grid', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {

		Ext.apply(this, {
			region:'center',
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
            	msgTarget: 'side',
				labelWidth: 105
			},
			defaults: {
				labelAlign: 'right'
			},
			buttonAlign: 'center'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		this.items = [{
			xtype:'textfield',
			fieldLabel : 'Search keyword',
			name : "query",
			emptyText: 'Keywords',
			labelAlign: 'right',
			anchor:'90%',
			listeners : {
				specialkey : function(o, e) {
					if (e.getKey() == e.ENTER)
						doSearch();
				}
			}
		}/*, {
			// column layout with 2 columns
			layout:'column',
			border:false,
			// defaults for columns
			defaults:{
				columnWidth:0.5,
				layout:'form',
				border:false,
				xtype:'panel',
				bodyStyle:'padding:0 18px 0 0'
			}
			,items:[{
				// left column
				// defaults for fields
				defaults:{anchor:'100%'},
				items:[{
					xtype: 'datefield',
					name: 'bldat',
					hideLabel: false,
					fieldLabel: 'Start Date',
					labelAlign: 'right',
					format:'d/m/Y',
					altFormats:'Y-m-d|d/m/Y',
					submitFormat:'Y-m-d'
				}]
			},{
				// right column
				// defaults for fields
				defaults:{anchor:'100%'},
				items:[{
					xtype: 'datefield',
					name: 'bldat2',
					hideLabel: false,
					fieldLabel: 'End Date',
					labelAlign: 'right',
					format:'d/m/Y',
					altFormats:'Y-m-d|d/m/Y',
					submitFormat:'Y-m-d'
				}]
			}]
		}*/];

		var doSearch = function(){
			var v = _this.getForm().getValues();
			_this.fireEvent('searchClick', _this, v);
		};

/*(4)---Buttons-------------------------------*/
		this.buttons = [{
			text: 'Search',
			handler: doSearch
		}, {
			text: 'Reset',
			handler: function() {
				_this.getForm().reset();
				_this.fireEvent('resetClick', _this);
			}
		}];

		return this.callParent(arguments);
	}
});