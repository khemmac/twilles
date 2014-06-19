Ext.define('TCMS.Order.Status.Main', {
	extend	: 'Ext.panel.Panel',

	constructor:function(config) {

		Ext.apply(this, {
			layout: 'border'
		});

		return this.callParent(arguments);
	},
	initComponent : function() {
		var _this=this;

		var form = this.form = Ext.create('TCMS.Order.Status.Form');

		/*
		1=Pending fabric
2=Pending tailor
3=Delivery in progress
4=Completed
5=Cancelled

		*/

		this.pendingFabricAct = Ext.create('BASE.Action', {
			text: 'Pending fabric',
			iconCls: 'b-small-hourglass'
		});
		this.pendingFabricAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('status');
				if(status>=1)
					this.setDisabled(true);
			}
		};

		this.pendingTailorAct = Ext.create('BASE.Action', {
			text: 'Pending tailor',
			iconCls: 'b-small-user-worker'
		});
		this.pendingTailorAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('status');
				if(status!=1)
					this.setDisabled(true);
			}
		};

		this.deliveryAct = Ext.create('BASE.Action', {
			text: 'Delivery in progress',
			iconCls: 'b-small-truck-box'
		});
		this.deliveryAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('status');
				if(status!=2)
					this.setDisabled(true);
			}
		};

		this.completeAct = Ext.create('BASE.Action', {
			text: 'Complete',
			iconCls: 'b-small-tick'
		});
		this.completeAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('status');
				if(status!=3)
					this.setDisabled(true);
			}
		};

		this.cancelAct = Ext.create('BASE.Action', {
			text: 'Cancel',
			iconCls: 'b-small-cross'
		});
		this.cancelAct.validate = function(source) {
			this.validateSingle(source);
			if(!this.isDisabled()){
				var o = source.getSelectedObject(),
					status = o.get('status');
				if(status==5)
					this.setDisabled(true);
			}
		};

		var groupMenu = new Ext.menu.Menu({
			items: [
				this.pendingFabricAct,
				this.pendingTailorAct,
				this.deliveryAct,
				this.completeAct,
				this.cancelAct
			]
		});

		this.grid = Ext.create('TCMS.Order.Status.Grid', {
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
		this.pendingFabricAct.setHandler(function(){
			var id = _this.pendingFabricAct.source.getSelectedId();
			form.changeStatusPending(id);
		});
		this.pendingTailorAct.setHandler(function(){
			var id = _this.pendingTailorAct.source.getSelectedId();
			form.changeStatusPendingTailor(id);
		});
		this.deliveryAct.setHandler(function(){
			var id = _this.deliveryAct.source.getSelectedId();
			form.changeStatusDelivery(id);
		});
		this.completeAct.setHandler(function(){
			var id = _this.completeAct.source.getSelectedId();
			form.changeStatusCompleted(id);
		});
		this.cancelAct.setHandler(function(){
			var id = _this.cancelAct.source.getSelectedId();
			form.changeStatusCancelled(id);
		});

		return this.callParent(arguments);
	}
});