Ext.define('TCMS.BaseMaster.field.UploadField', {
	extend	: 'Ext.ux.SWFUpload',

	autoStart: false
	,debugMode: false
	,targetUrl: __site_url+'backend/THE_CONTROLLER/upload'
	,fieldName: 'userfile'
	,swfUrl: __base_url+'assets/jslib/swfupload/swfupload.swf'
	,progressBar: false
	,file_size_limit: "16 MB"
	,file_types: '*.png;'
	,file_types_description: 'Png file'
	,button_width: 59
	,button_height: 18
	,button_image_url: __base_url+'assets/jslib/swfupload/swf-upload-button-small.jpg'
	,baseParams: [{
		aa: 11
	}],

	constructor:function(config) {

		return this.callParent(arguments);
	},

	initComponent : function() {

		return this.callParent(arguments);
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