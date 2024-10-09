Ext.define('MyApp.view.main.employee.ServiceHistoryForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'service-history-form-tab',

    tbar: [{
        text: 'Update',
        iconCls: 'x-fa fa-redo'
    }, {
        text: 'Delete',
        iconCls: 'x-fa fa-cancel'
    }, {
        text: 'Copy',
        iconCls: 'fa fa-copy'
    }],

    items: [{
        xtype: 'form',
        cls: 'form-cls',
        style: 'background:#f1f1f1;',
        border: false,
        padding: '0 0 0 80',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 115,
            allowBlank: false
        },
        layout: {
            type: 'vbox'
        },
        bodyPadding: 5,
        items: [{
            xtype: 'date-field',
            fieldLabel: 'Effective Date',
            allowBlank: false,
            fieldWidth: 235,
            emptyText: '12/27/1997'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Status Code',
            allowBlank: false,
            value: 'Active'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Division',
            allowBlank: false,
            value: 'DIV1'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Location',
            allowBlank: false,
            value: 'LOC1'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Union',
            allowBlank: false,
            value: 'UNION2'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Life of Business',
            value: 'LOB1'
        }]
    }]
});
