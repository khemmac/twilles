Ext.define('TCMS.BaseMaster.priority.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],

	moduleType: null,

	constructor:function(config) {

		Ext.apply(this, {
			height: 440,
			width: 300,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center'
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		this.changePriorityAct = Ext.create('BASE.Action', {
			text: 'Change priority',
			iconCls: 'b-small-record_move'
		});

		this.closeAct = Ext.create('BASE.Action', {
			region :'center',
			text: 'Close'
		});

		this.buttons = [
			new Ext.button.Button(this.closeAct)
		];

		this.items = [Ext.create('Ext.panel.Panel', {
			html:'xxxxxx'
		})];

		this.closeAct.setHandler(function(){
			_this.hide();
		});

		this.on("show", function() {
			//_this.form.getEl().scrollTo('top',0,false);
			//_this.form.formParams = _this.dialogParams;
			//_this.form.formAction = _this.dialogAction;
			_this.actions[_this.dialogAction].call(_this);
		});

		return this.callParent(arguments);
	},
	actions : {
		"edit" : function() {
			//this.form.form.reset();
			//this.form.loadData();
		}
	}
});
