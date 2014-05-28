Ext.define('BASE.field.FormattableDisplayField', {
	//extend: 'Ext.form.field.Number',//Extending the NumberField
	extend: 'Ext.form.DisplayField',

	dateFormat:'Y-m-d H:i:s',
	type:'date',
	displayFormat:'d/m/Y H:i:s',

	setValue: function(value) {
		if (!this.type) {
			this.superclass.setValue(value);
		}

		else if (this.type == 'date') {

			var parsedDate = Ext.Date.parse(value, this.dateFormat);
			if (Ext.isDate(parsedDate)) {
				this.setRawValue(Ext.Date.format(parsedDate, this.displayFormat));
			}
			else {
				this.setRawValue(value);
			}
		}
		else if (this.formatter) {
			var formattedValue = this.formatter(value);
			this.setRawValue(formattedValue);
		}
	}

});