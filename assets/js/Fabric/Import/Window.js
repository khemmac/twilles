Ext.define('TCMS.Fabric.Import.Window', {
	extend	: 'BASE.Window',
	requires : ['BASE.Window'],
	constructor:function(config) {

		Ext.apply(this, {
			height: 550,
			width: 800,
			resizable: false,
			modal: true,
			layout:'border',
			buttonAlign : 'center',
			border: false
		});

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		var uploader = Ext.create('Ext.ux.SWFUpload', {
			autoStart: false
			,debugMode: true
			,targetUrl: __site_url+'backend/fabric/upload'
			,fieldName: 'userfile'
			,swfUrl: __base_url+'assets/ext/ux/swfupload/swfupload.swf'
			,progressBar: false
			,file_size_limit: "16 MB"
			,file_types: '*.xls; *.xlsx;'
			,file_types_description: 'Excel file'
			,button_width: 59
			,button_height: 18
			,button_image_url: __base_url+'assets/ext/ux/swfupload/swf-upload-button-small.jpg'
			,baseParams: [{
				aa: 11
			}],
			swfUploadCfg: {
				post_params: {"UID" : ''},
				file_upload_limit : "0",
				file_queue_limit : "0",
				button_action : SWFUpload.BUTTON_ACTION.SELECT_FILE,
				button_cursor : SWFUpload.CURSOR.HAND,
				button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
				file_dialog_start_handler : function(){
					// clear queue
					var stats = this.getStats();
					// while the queue is not empty ...
					while (stats.files_queued > 0) {
						// .. cancel the first in the queue (null: take the first found, false: don't trigger an error event)
						this.cancelUpload(null, false);
						// it is important to reload the stats everytime and not just do a for (i = 0; i < stats.files_queued ...
						stats = this.getStats();
					}

					// set guid
					var guid = _this.guid();
					this.setPostParams({"UID" : guid});
					_this.form.form.findField('UID').setValue(guid);
				},
				file_dialog_complete_handler: function(){

					var uploadStats = uploader.getStats();
					if(uploadStats.files_queued>0){
						var progressBox = Ext.MessageBox.show({
							title: 'Please wait',
							progressText: 'Uploading...',
							width:300,
							progress:true,
							closable:false,
							closeAction: 'destroy'
						});

						uploader.progressBar = progressBox;
						uploader.startUpload();
						return;
					}
				}


			},
			listeners: {
				fileQueued: function(f){
					_this.form.form.findField('UPLOAD_FILENAME').setValue(f.name);
				}
			}
		});

		this.form = Ext.create('BASE.Form', {
			region: 'north',
			split: true,
			border: true,
			height: 50,
			defaults: {
				labelWidth: 100,
				labelAlign: 'right',
				width: 300
			},
			items: [{
				xtype: 'hiddenfield',
				name: 'UID'
			}, {
				xtype: 'fieldcontainer',
				layout: 'hbox',
				fieldLabel: 'Excel',
				combineErrors: false,
				anchor: '100%',
				defaults: {
					hideLabel: true
				},
				items: [{
					xtype: 'textfield',
					emptyText: 'Select an excel file',
					fieldLabel: 'Photo',
					name: 'UPLOAD_FILENAME',
					width: 240,
					readOnly: true
				}, uploader, {
					xtype: 'displayfield',
					value: 'excel file'
				}]
			}],
			mapping: function(o){
				return o;
			},
			getSaveUrl: function(){ return __site_url+'backend/dao/'+((_this.dialogAction == "add")?'insert':'update'); },
			getLoadUrl: function(){ return __site_url+'backend/dao/load'; },
			getDeleteUrl: function(){ return __site_url+'backend/dao/delete'; }
		});

		this.grid = Ext.create('TCMS.Fabric.Import.Grid', {
			region: 'center'
		});

		this.submitAct = Ext.create('BASE.Action', {
			text: 'Submit'
		});

		this.cancelAct = Ext.create('BASE.Action', {
			text: 'Cancel'
		});

		this.buttons = [
			new Ext.button.Button(this.submitAct),
			new Ext.button.Button(this.cancelAct)
		];

		//this.progress.show();

		this.items = [this.form, this.grid];

		this.submitAct.setHandler(function(){
			_this.form.saveData();
			//_this.fireEvent('login_success');
		});

		this.cancelAct.setHandler(function(){
			_this.hide();
		});

		this.form.on('form_key_enter', function(){
			_this.submitAct.execute();
		});

		this.on("show", function() {
			_this.form.getEl().scrollTo('top',0,false);
			_this.form.formParams = _this.dialogParams;
			_this.form.formAction = _this.dialogAction;
			_this.actions[_this.dialogAction].call(_this);
		});

		// after upload complete
		uploader.on('uploadResponse', function(file, responseText, receivedResponse){
			console.log('FROM UPLOAD RESPONSE');
			console.log(responseText);
			console.log(receivedResponse);
		});

		return this.callParent(arguments);
	},
	actions : {
		"add" : function() {
			this.form.form.reset();
		},
		"edit" : function() {
			this.form.form.reset();
			this.form.loadData();
		},
		"delete" : function() {
			var _this = this;
			this.hide(null, function() {
				_this.form.deleteData();
			});
		}
	},
	guid: function(){
		// generate guid
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		};

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}
});
