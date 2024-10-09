Ext.define('MyApp.view.main.employee.Miscellaneous', {
    extend: 'Ext.panel.Panel',
    xtype: 'miscellaneous',

    height: '100%',
    padding: '0 5',
    border: false,
    cls: 'form-cls',
    style: 'background:#f1f1f1;',
    scrollable: true,

    tbar: [{
        xtype: 'button',
        text: 'update',
        iconCls: "x-fa fa-redo"
    }],

    defaults: {
        xtype: 'fieldset',
        labelAlign: 'right'
    },
    items: [{
        items: [{
            xtype: 'textfield',
            labelAlign: 'right',
            fieldLabel: 'Data Quality',
            labelWidth: 200,
            padding: '5 0 0 0',
            width:345
        }]
    }, {
        title: '1) Flags',
        defaultType: 'combobox',
        defaults: {
            value: '- Not Selected --',
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            fieldLabel: 'TRM Calculations Disabled'
        }, {
            fieldLabel: 'Bad Data Flag'
        }, {
            fieldLabel: 'Rehire Flag'
        }, {
            fieldLabel: 'QDRO Flag'
        }, {
            fieldLabel: 'Subsidized Lump Sum'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Batch Number',
            width:345,
            value: ' '
        }]
    }, {
        title: '2)Power of Attorney',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Has POA',
            value: 'False'
        }, {
            xtype: 'textfield',
            fieldLabel: 'POA Note',
            width:345
        }]
    }, {
        title: 'Choice Program',
        defaultType: 'date-field',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            fieldLabel: 'Election Period Start Date'
        }, {
            fieldLabel: 'Election Period End Date'
        }, {
            fieldLabel: 'Choice Date',
            afterLabelTextTpl: '<span style="color:green;font-weight:bold" data-qtip="Required">*</span>'
        }, {
            xtype: 'combobox',
            fieldLabel: 'My Election'
        }]
    }, {
        title: 'ESS access',
        defaultType: 'combobox',
        defaults: {
            value: '- Not Selected --',
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            fieldLabel: 'Suppress Ess Statement'
        }, {
            fieldLabel: 'Receive Electronic Materials'
        }]
    }, {
        title: 'ESS Access',
        defaultType: 'combobox',
        defaults: {
            value: '- Not Selected --',
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            fieldLabel: 'ESS Access'
        }, {
            fieldLabel: 'ESS Calculations Disabled:'
        }, {
            fieldLabel: 'ESS Experience',
            width: 360
        }]
    }, {
        title: 'Audit'
    }]
});