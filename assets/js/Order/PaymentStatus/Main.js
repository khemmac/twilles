Ext.define('TCMS.Order.PaymentStatus.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		var form = this.form = Ext.create('TCMS.Order.PaymentStatus.Form');

		this.pendingAct = Ext.create('BASE.Action', {
			text: 'Pending payment',
			iconCls: 'b-small-hourglass'
		});
		this.pendingAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('payment_status');
				console.log('VALIDATE PENDING:', status);
				if(status>=1)
					this.setDisabled(true);
			}
		};

		this.paidAct = Ext.create('BASE.Action', {
			text: 'Paid',
			iconCls: 'b-small-tick'
		});
		this.paidAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('payment_status');
				console.log('VALIDATE PAID:', status);
				if(status!=1)
					this.setDisabled(true);
			}
		};

		var groupMenu = new Ext.menu.Menu({
			items: [this.pendingAct, this.paidAct]
		});

		this.grid = Ext.create('TCMS.Order.PaymentStatus.Grid', {
			region: 'center',
			border: false,
			tbar: [{
				text:'Change status',
				iconCls: 'b-small-tick-white',
				menu: groupMenu
	        }]
		});

		this.items = [this.grid];

		// ** Hander
		this.pendingAct.setHandler(function(){
			var id = _this.pendingAct.source.getSelectedId();
			form.changeStatusPending(id);
		});
		this.paidAct.setHandler(function(){
			var id = _this.paidAct.source.getSelectedId();
			form.changeStatusPaid(id);
		});

		return this.callParent(arguments);
	}
});