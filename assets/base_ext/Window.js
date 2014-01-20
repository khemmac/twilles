Ext.define('BASE.Window', {
	extend	: 'Ext.window.Window',
	constructor:function(config) {

		Ext.apply(this, {
			closeAction: 'hide'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		if(!this.minWidth)
			this.minWidth=this.width;
		if(!this.minHeight)
			this.minHeight=this.height;

		return this.callParent(arguments);
	},
	// IDialogForm
	source : null,
	dialogParams : null,
	dialogAction : null,
	openDialog : function(title, action, sender, params, callback) {
		this.source = sender;
		this.dialogParams = params;
		this.dialogAction = action;
		if(title)
			this.setTitle(title);
		this.show(null, callback, this);
	}
});