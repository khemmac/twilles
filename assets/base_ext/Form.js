Ext.define('BASE.Form', {
	extend	: 'Ext.form.Panel',
	monitorValid : true,
	bodyPadding: '10 0 0 5',
	constructor:function(config) {

		Ext.apply(this, {
			border: false,
			defaults:{
				labelAlign: 'right'
			}
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		return this.callParent(arguments);
	},

	createForm: function() {
		var cfg = {},
			props = this.basicFormConfigs,
			len = props.length,
			i = 0,
			prop;

		for (; i < len; ++i) {
			prop = props[i];
			cfg[prop] = this[prop];
		}

		cfg = Ext.applyIf({listeners: {},mapping:this.mapping}, cfg);

		return Ext.create('BASE.FormBasic', this, cfg);//new Ext.form.Basic(this, cfg);
	},

	getSaveUrl : function() {
		return MUST_IMPLEMENT('/' + ((this.formAction == "add") ? 'AddUrl' : 'EditUrl'));
	},
	getLoadUrl : function() {
		return MUST_IMPLEMENT('LoadUrl');
	},
	getDeleteUrl : function() {
		return MUST_IMPLEMENT('DeleteUrl');
	},
	getSaveParams : function() {
		return this.formParams;
	},
	getLoadParams : function() {
		return this.formParams;
	},
	getDeleteParams : function() {
		return this.formParams;
	},
	submitData : function(arg) {
		var _this = this;
		var opts = {
			url : url,
			submitEmptyText : false,
			clientValidation : true,
			success : function(form, act) {
				_this.fireEvent('afterSave', _this, act);
			},
			failure : _this.failureAlert,
			waitMsg : 'Submit...',
			waitTitle : 'Please wait...',
			params : _this.getSaveParams()
		};
		if(typeof(arg)=='object')
			opts = Ext.apply(opts, arg);
		_this.form.submit(opts);
	},
	saveData : function() {
		var _this = this;
		var url = _this.getSaveUrl();
		_this.form.submit({
			url : url,
			submitEmptyText : false,
			clientValidation : true,
			success : function(form, act) {
				_this.fireEvent('afterSave', _this, act);
			},
			failure : _this.failureAlert,
			waitMsg : 'Saving...',
			waitTitle : 'Please wait...',
			params : _this.getSaveParams()
		});
	},
	loadData : function() {
		var _this = this;
		var url = _this.getLoadUrl();
		_this.form.load({
			url : url,
			clientValidation : true,
			success : function(form, act) {
				_this.fireEvent('afterLoad', _this, act);
			},
			failure : _this.failureAlert,
			waitMsg : 'Loading...',
			waitTitle : 'Please wait...',
			params : _this.getLoadParams()

		});
	},
	deleteData : function() {
		var _this = this;
		Ext.Msg.show({
			title : this.deleteQuestionTitle||"Warning",
			msg : this.deleteQuestionMsg||"Do you want to delete item(s) ?",
			icon : Ext.Msg.WARNING,
			buttons : Ext.Msg.YESNO,
			fn : function(bt) {
				if (bt == "yes") {
					var url = _this.getDeleteUrl();
					_this.form.load({
						url : url,
						success : function(form, act) {
							_this.fireEvent('afterDelete', _this,act);
						},
						failure : _this.failureAlert,
						waitMsg : 'Deleting...',
						waitTitle : 'Please wait...',
						params : _this.getDeleteParams()
					});
				}
			}
		});
	},
	failureAlert: function(form, action){
		var showError = function(title, msg){
			Ext.Msg.show({
				title : title,
				msg : msg,
				icon : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
		};
		switch (action.failureType) {
			case Ext.form.action.Action.CLIENT_INVALID:
				showError('Failure', 'Form fields may not be submitted with invalid values');
				break;
			case Ext.form.action.Action.CONNECT_FAILURE:
				showError('Failure', 'Ajax communication failed');
				break;
			case Ext.form.action.Action.SERVER_INVALID:
				var msg = action.result.message;
				showError('Failure', msg || action.response.responseText);
				break;
		}
	},
	reset: function(){
		this.form.reset();
	}
});