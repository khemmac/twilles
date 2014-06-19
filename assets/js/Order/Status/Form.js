Ext.define('TCMS.Order.Status.Form', {
	extend	: 'BASE.Form',
	requires : ['BASE.Form'],
	constructor:function(config) {
		var _this=this;

		Ext.apply(this, {
			bodyPadding : false,
			autoScroll: false
		});

		// methods
		var changeStatus = function(url, params){
			_this.load({
				url : url,
				success : function(form, act) {
					_this.fireEvent('afterChangeStatus', form, act);
				},
				failure : _this.failureAlert,
				waitMsg : 'Changing status...',
				waitTitle : 'Please wait...',
				params: params
			});
		};
		this.changeStatusPending = function(id){
			changeStatus(__site_url+'backend/order/OrderStatusPendingFabric', {
				id: id
			});
		};
		this.changeStatusPendingTailor = function(id){
			changeStatus(__site_url+'backend/order/OrderStatusPendingTailor', {
				id: id
			});
		};
		this.changeStatusDelivery = function(id){
			changeStatus(__site_url+'backend/order/OrderStatusDelivery', {
				id: id
			});
		};
		this.changeStatusCompleted = function(id){
			changeStatus(__site_url+'backend/order/OrderStatusCompleted', {
				id: id
			});
		};
		this.changeStatusCancelled = function(id){
			changeStatus(__site_url+'backend/order/OrderStatusCancelled', {
				id: id
			});
		};

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		// *** FIELDS ***
		var _fieldDefaults = {
			labelAlign: 'right',
			anchor:'100%',
			labelWidth: 90
		};

		var _createField = function(ns, config){
			return Ext.create(ns, Ext.apply(config, _fieldDefaults));
		};

		this.items = [];

		return this.callParent(arguments);
	}
});