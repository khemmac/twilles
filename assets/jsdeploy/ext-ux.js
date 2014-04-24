
Ext.define('Ext.ux.SWFUpload',{extend:'Ext.Component',requires:['Ext.util.Cookies'],config:{autoStart:true,debugMode:false,targetUrl:'/media/json/upload',fieldName:'mediaFile',swfUrl:'/jslib/SWFUpload/Flash/swfupload.swf',swfUploadCfg:{},relayCookies:false,baseParams:[],progressBar:false,file_size_limit:"16 MB",file_types:'*.jpg; *.jpeg; *.png; *.gif; *.JPG; *.JPEG; *.PNG; *.GIF',file_types_description:'Media',button_width:100,button_height:22,button_image_url:'/img/icons/blank_upload_button.png',scope:null,button_action:SWFUpload.BUTTON_ACTION.SELECT_FILES},constructor:function(config){this.initConfig(config);return this.callParent(arguments);},initComponent:function(){if(!this.relayCookies)
this.relayCookies=['s'];this.errorOccurred=false;this.flashContainerId=Ext.id(null,'swfupload');this.addEvents({'ready':true,'queueError':true,'filesSelected':true,'fileQueued':true,'uploadError':true,'uploadStarted':true,'uploadProgress':true,'uploadComplete':true,'uploadResponse':true,'allUploadsComplete':true});this.callParent(arguments);},onRender:function(container,position){this.callParent(arguments);this.photoUploaderSpan=this.el.createChild({tag:'span',id:this.flashContainerId,style:'margin: 2px'});var params=Ext.apply({},this.baseParams);Ext.each(this.relayCookies,function(cookieName){params[cookieName]=Ext.util.Cookies.get(cookieName)});var config=this.getConfig(params);this.SWFUpload=new SWFUpload(config);},setPostParams:function(params){for(var field in params)
{this.addPostParam(field,params[field]);}},addPostParam:function(field,value)
{this.SWFUpload.addPostParam(field,value);},getConfig:function(params){return Ext.apply({debug:this.debugMode,upload_url:this.targetUrl,file_post_name:this.fieldName,flash_url:this.swfUrl,post_params:params,button_placeholder_id:this.flashContainerId,button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,button_width:this.button_width,button_height:this.button_height,button_image_url:this.button_image_url,button_text_left_padding:20,button_text_top_padding:2,button_action:this.button_action,file_size_limit:this.file_size_limit,file_types:this.file_types,file_types_description:this.types_description,file_upload_limit:"0",swfupload_loaded_handler:Ext.bind(function(){if(false!==this.fireEvent('ready')&&this.progressBar)
{this.progressBar.updateProgress(0,'Ready to upload media',false);this.progressBar.enable();}},this),file_queue_error_handler:Ext.bind(function(file,errorCode,errorMessage){this.errorOccurred=true;if(false!==this.fireEvent('queueError',file,errorCode,errorMessage))
{Ext.Msg.alert('Upload Failed','This file cannot be uploaded:<br><br>'+errorMessage);}},this),upload_error_handler:Ext.bind(function(file,errorCode,errorMessage){this.errorOccurred=true;if(this.debugMode)
{console.log('upload_error_handler',file,errorCode,errorMessage);}
if(false!==this.fireEvent('uploadError',file,errorCode,errorMessage))
{Ext.Msg.alert('Upload Failed','An error occured while uploading your file:<br><br>'+errorMessage);}},this),file_dialog_complete_handler:Ext.bind(function(numFilesSelected,numFilesQueued,queueTotal){this.errorOccurred=false;if(false!==this.fireEvent('filesSelected',numFilesSelected,numFilesQueued,queueTotal)&&this.progressBar)
{if(numFilesQueued)
this.progressBar.updateProgress(0,'Preparing to upload '+queueTotal+(queueTotal>1?' files...':' file...'),false);else
this.progressBar.updateProgress(0,'Ready to upload media',false);}
if(this.autoStart)
{try{if(numFilesSelected>0){this.SWFUpload.startUpload();}}catch(ex){this.SWFUpload.debug(ex);}}},this),file_queued_handler:Ext.bind(function(file){this.fireEvent('fileQueued',file);},this),upload_start_handler:Ext.bind(function(file){if(this.errorOccurred)
{return;}
if(false!==this.fireEvent('uploadStarted',file)&&this.progressBar)
{this.progressBar.updateProgress(0,'Uploading '+file.name,false);}},this),upload_progress_handler:Ext.bind(function(file,bytesLoaded,bytesTotal){if(this.errorOccurred)
{return;}
if(false!==this.fireEvent('uploadProgress',file,bytesLoaded,bytesTotal)&&this.progressBar)
{this.progressBar.updateProgress(bytesLoaded/bytesTotal,'Uploading '+file.name,true);}},this),upload_success_handler:Ext.bind(function(file,responseText,receivedResponse){if(this.errorOccurred)
{return;}
this.fireEvent('uploadResponse',file,responseText,receivedResponse);if(this.debugMode)
{console.log('Received upload response for %s: %o',file.name,responseText);}},this),upload_complete_handler:Ext.bind(function(file){if(this.errorOccurred)
{return;}
if(false!==this.fireEvent('uploadComplete',file)&&this.progressBar)
{this.progressBar.updateProgress(1,'Finished uploading '+file.name,true);this.progressBar.el.frame();}
if(this.SWFUpload.getStats().files_queued==0)
{if(false!==this.fireEvent('allUploadsComplete')&&this.progressBar)
{this.progressBar.updateText('Finished uploading all files.');}}
else
{if(this.autoStart)
{this.SWFUpload.startUpload();}}},this)},this.swfUploadCfg);},getStats:function(){return this.SWFUpload.getStats();},getFile:function(index){return this.SWFUpload.getFile(index);},cancelUpload:function(index,triggerErrorEvent){if(triggerErrorEvent!==false){triggerErrorEvent=true;}
return this.SWFUpload.cancelUpload(index);},startUpload:function(index){return this.SWFUpload.startUpload(index);}});;Ext.define('Ext.ux.form.NumericField',{extend:'Ext.form.field.Number',alias:'widget.numericfield',currencySymbol:null,currencySymbolPos:'right',useThousandSeparator:true,thousandSeparator:',',alwaysDisplayDecimals:false,fieldStyle:'text-align: right;',initComponent:function(){if(this.useThousandSeparator&&this.decimalSeparator==','&&this.thousandSeparator==',')
this.thousandSeparator='.';else
if(this.allowDecimals&&this.thousandSeparator=='.'&&this.decimalSeparator=='.')
this.decimalSeparator=',';this.callParent(arguments);},setValue:function(value){Ext.ux.form.NumericField.superclass.setValue.call(this,value!=null?value.toString().replace('.',this.decimalSeparator):value);this.setRawValue(this.getFormattedValue(this.getValue()));},getFormattedValue:function(value){if(Ext.isEmpty(value)||!this.hasFormat())
return value;else
{var neg=null;value=(neg=value<0)?value*-1:value;value=this.allowDecimals&&this.alwaysDisplayDecimals?value.toFixed(this.decimalPrecision):value;if(this.useThousandSeparator)
{if(this.useThousandSeparator&&Ext.isEmpty(this.thousandSeparator))
throw('NumberFormatException: invalid thousandSeparator, property must has a valid character.');if(this.thousandSeparator==this.decimalSeparator)
throw('NumberFormatException: invalid  thousandSeparator, thousand separator must be different from  decimalSeparator.');value=value.toString();var ps=value.split('.');ps[1]=ps[1]?ps[1]:null;var whole=ps[0];var r=/(\d+)(\d{3})/;var ts=this.thousandSeparator;while(r.test(whole))
whole=whole.replace(r,'$1'+ts+'$2');value=whole+(ps[1]?this.decimalSeparator+ps[1]:'');}
if(this.currencySymbolPos=='right'){return Ext.String.format('{0}{1}{2}',(neg?'-':''),value,(Ext.isEmpty(this.currencySymbol)?'':' '+this.currencySymbol));}else{return Ext.String.format('{0}{1}{2}',(neg?'-':''),(Ext.isEmpty(this.currencySymbol)?'':this.currencySymbol+'  '),value);}}},parseValue:function(value){return Ext.ux.form.NumericField.superclass.parseValue.call(this,this.removeFormat(value));},removeFormat:function(value){if(Ext.isEmpty(value)||!this.hasFormat())
return value;else
{if(this.currencySymbolPos=='right'){value=value.toString().replace(' '+this.currencySymbol,'');}else{value=value.toString().replace(this.currencySymbol+' ','');}
value=this.useThousandSeparator?value.replace(new RegExp('['+this.thousandSeparator+']','g'),''):value;return value;}},getErrors:function(value){return Ext.ux.form.NumericField.superclass.getErrors.call(this,this.removeFormat(value));},hasFormat:function(){return this.decimalSeparator!='.'||(this.useThousandSeparator==true&&this.getRawValue()!=null)||!Ext.isEmpty(this.currencySymbol)||this.alwaysDisplayDecimals;},onFocus:function(){this.setRawValue(this.removeFormat(this.getRawValue()));this.callParent(arguments);},processRawValue:function(value){return this.removeFormat(value);}});