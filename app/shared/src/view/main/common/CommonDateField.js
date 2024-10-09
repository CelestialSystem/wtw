Ext.define('MyApp.view.main.common.CommonDateField', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.date-field',

    config: {
        width: 100
    },
    constrainWidth: 120,
    name: 'from_date',

    setWidth: function(width) {
        if(this.fieldWidth){
            return this.setSize(this.fieldWidth);
        }
        return this.setSize(this.labelWidth + this.constrainWidth);
    }
});

