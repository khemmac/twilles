Ext.define('BASE.ux.FormStatus', {
	extend: 'Ext.AbstractPlugin',

	moduleType: null,

	init: function (form) {
		var me = this;

		//me.moduleType.length;

		form = Ext.apply(form, {
			getSetStatusParams : function() {
				return Ext.apply({
					type : me.moduleType
				}, this.formParams);
			},
			getSetStatusUrl : function() {
				return __site_url+'backend/istatus/set';
			},
			setStatus : function() {
				var _this = this;
				var url = form.getSetStatusUrl();
				_this.form.load({
					url : url,
					clientValidation : true,
					success : function(form, act) {
						_this.fireEvent('afterSetStatus', _this, act);
					},
					failure : _this.failureAlert,
					waitMsg : 'Changing status...',
					waitTitle : 'Please wait...',
					params : _this.getSetStatusParams()
				});
			}
		});
	}
});