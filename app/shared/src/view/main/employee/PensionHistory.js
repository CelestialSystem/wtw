Ext.define('MyApp.view.main.employee.PensionHistory', {
    extend: 'Ext.panel.Panel',
    xtype: 'pension-history-tab',

    border: false,

    tbar: [{
        text: 'Pension History',
        iconCls: 'fa fa-notes-medical'
    }, {
        text: 'Pension Misc',
        iconCls: 'fa fa-landmark'
    }, {
        text: 'Beneficiaries',
        iconCls: 'fa fa-landmark'
    }, {
        text: 'Benefit Payments',
        iconCls: 'fa fa-file-invoice-dollar'
    }, {
        text: 'Cash Balance',
        iconCls: 'fa fa-wallet'
    }],

    items: [{
        xtype: 'panel',
        border: false,
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
            padding: '0 0 0 80',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 115,
                allowBlank: false
            },
            layout: {
                type: 'vbox'
            },
            border: false,
            bodyPadding: 5,
            items: [{
                xtype: 'combobox',
                fieldLabel: 'Pension Plan',
                emptyText: 'Pension Plan',
                allowBlank: false
            }, {
                xtype: 'date-field',
                fieldLabel: 'Begin Date',
                allowBlank: false,
                value: '12/27/1997',
                fieldWidth: 235
            }, {
                xtype: 'combobox',
                fieldLabel: 'Status Code',
                allowBlank: false,
                value: 'Active'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Notes:',
                allowBlank: true
            }]
        }]
    }, {
        xtype: 'panel',
        title: 'Audit'
    }]
});