Ext.define('BASE.FormBasic', {
	extend	: 'Ext.form.Basic',

	uploadFields: [],

	constructor:function(config) {

		return this.callParent(arguments);
	},

	initComponent : function() {
		var _this=this;

		return this.callParent(arguments);
	},

	getValues: function(asString, dirtyOnly, includeEmptyText, useDataValues) {
		var values  = {},
			fields  = this.getFields().items,
			f,
			fLen	= fields.length,
			isArray = Ext.isArray,
			field, data, val, bucket, name;

		var u=[];
		for (f = 0; f < fLen; f++) {
			field = fields[f];

			if (!dirtyOnly || field.isDirty()) {
				data = field[useDataValues ? 'getModelData' : 'getSubmitData'](includeEmptyText);

				if (Ext.isObject(data)) {
					for (name in data) {
						if (data.hasOwnProperty(name)) {
							val = data[name];

							if (includeEmptyText && val === '') {
								val = field.emptyText || '';
							}

							if (values.hasOwnProperty(name)) {
								bucket = values[name];

								if (!isArray(bucket)) {
									bucket = values[name] = [bucket];
								}

								if (isArray(val)) {
									values[name] = bucket.concat(val);
								} else {
									bucket.push(val);
								}
							} else {
								values[name] = val;
							}
						}
					}
				}
			}
			//console.log('CHECK instance of swfupload', (f instanceof Ext.ux.SWFUpload));
			if(typeof(Ext.ux.SWFUpload)=="function" && f instanceof Ext.ux.SWFUpload)
				u.push(field);
		}
		this.uploadFields=u;

        if(typeof(this.mapping)=="function")
            values = this.mapping(values);

		if (asString) {
			values = Ext.Object.toQueryString(values);
		}

		return values;
	},
	hasFileUpload : function() {
		return (this.uploadFields && this.uploadFields.length > 0);
	},
	getInvalidFields: function() {
		var invalidFields = [];
		Ext.suspendLayouts();
		this.form.getFields().filterBy(function(field) {
			if (field.validate()) return;
			invalidFields.push(field);
		});
		Ext.resumeLayouts(true);
		return invalidFields;
	}
});