Ext.define('MyApp.view.main.employee.Detail', {
    extend: 'Ext.panel.Panel',
    xtype: 'employee-detail',
    border: false,
    tbar: [{
        xtype: 'button',
        text: 'update',
        iconCls: "x-fa fa-redo"
    }, {
        xtype: 'button',
        text: 'Delete',
        iconCls: "x-fa fa-cancel"
    }],

    items: [{
        xtype: 'form',
        padding: '10 120',
        border: false,
        cls: 'form-cls',
        style: 'background:#f1f1f1;',
        defaults: {
            labelAlign: 'right',
            width: 245
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Record ID',
            name: 'id',
            value: '384585',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Employee Num',
            name: 'Employee_Num',
            value: ' '
        }, {
            xtype: 'textfield',
            fieldLabel: 'Hire Date',
            name: 'h_date',
            value: '12/27/1997'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Team Date',
            name: 't_date', value: ' '
        }, {
            xtype: 'container',
            defaults: {
                xtype: 'combobox',
                disabled: true,
                labelAlign: 'right'
            },
            items: [{
                fieldLabel: 'Status Code',
                allowBlank: false,
                value: 'Active'
            }, {
                fieldLabel: 'Division',
                value: 'DIV1'
            }, {
                fieldLabel: 'Location',
                value: 'LOC1'
            }, {
                fieldLabel: 'Union',
                value: 'UNION2'
            }, {
                fieldLabel: 'Line of Business',
                value: 'LOB1'
            },]
        }]
    }],

    bbar:[{
        text:'<b>Audit</b>'
    },'->',{
        iconCls:'x-fa fa-caret-down'
    }]
});