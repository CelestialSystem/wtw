Ext.define('MyApp.view.main.employee.Personal', {
    extend: 'Ext.panel.Panel',
    xtype: 'personal',

    items: [{
        xtype: 'form',
        padding: '10 80',
        border: false,
        cls: 'form-cls',
        style: 'background:#f1f1f1;',

        defaults: {
            xtype: 'textfield',
            labelAlign: 'right',
            labelWidth: 200
        },

        items: [{
            fieldLabel: 'Record ID',
            value: '4396',
            allowBlank: false,
            width: 345
        }, {
            xtype: 'combobox',
            value: 'United States',
            fieldLabel: 'Country',
            allowBlank: false,
            width: 338
        }, {
            xtype: 'combobox',
            fieldLabel: 'Honorific Code',
            value: '- Not Selected --'
        }, {
            fieldLabel: 'Last Name',
            value: 'Active',
            allowBlank: false
        }, {
            fieldLabel: 'First Name',
            value: 'Adam',
            allowBlank: false
        }, {
            fieldLabel: 'Middle Name',
            value: ' '
        }, {
            xtype: 'combobox',
            value: 'Male',
            fieldLabel: 'Gender',
            allowBlank: false,
            width: 300
        }, {
            fieldLabel: 'SSN',
            value: 'TCESS3001'
        }, {
            fieldLabel: 'Birth Date',
            value: ' '
        }, {
            fieldLabel: 'Death Date',
            value: ' '
        }, {
            fieldLabel: 'Ess Code',
            value: 'esecure'
        }, {
            fieldLabel: 'Email',
            value: 'shirish.joglekar@willistowerswatson.com',
            width: 455
        }, {
            fieldLabel: 'Home Phone',
            value: '2674396103'
        }, {
            fieldLabel: 'Mobile',
            value: ' '
        }]
    }]
})