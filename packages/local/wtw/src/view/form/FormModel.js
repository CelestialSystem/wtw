Ext.define('WTW.view.form.DynamicFormModel', {
    alternateClassName: 'DynamicFormModelUtil',
    singleton: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '',
            update: '' 
        },
        reader: {
            type: 'json'
        },

        actionMethods: {
            read: "GET",
            create: "POST",
            update: "PUT",
            destroy: "DELETE",
          },
        writer: {
            writeAllFields: false,
            type: 'json'
        }
    }
});