Ext.define('MyApp.view.main.employee.ServiceHistory', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.toolbar.Paging'
    ],

    xtype: 'service-history-tab',
    viewModel: 'service-history-vm',
    border: false,
    width: '100%',
    height: 500,
    selType: 'checkboxmodel',

    tbar: [{
        text: 'Add New',
        iconCls: 'fa fa-plus'
    }, {
        text: 'Update',
        iconCls: 'x-fa fa-redo'
    }, {
        text: 'Delete',
        iconCls: 'x-fa fa-cancel'
    }, {
        text: 'Worksheet',
        iconCls: 'x-fa fa-redo'
    }],

    bbar: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{serviceHistory}'
        },
        displayInfo: true,
        width: '100%',
        displayMsg: 'Displaying topics {0} - {1} of {2}',
        emptyMsg: "No topics to display",
        items: ['-',
            {
                xtype: 'displayfield',
                labelWidth: 68,
                margin: '4px 0px 0px 0px',
                fieldLabel: 'Page Loaded',
                allowBlank: true,
                value: Ext.Date.format(new Date(), 'd-m-Y g:i a'),
                cls: 'grid-paging-toolbar'
            }
        ]
    }],

    bind: {
        store: '{serviceHistory}'
    },

    columns: [{
        xtype: 'rownumberer'
    }, {
        text: 'Effective Date',
        dataIndex: 'effectiveDate',
        renderer: function (value) {
            return '<a href="#">' + value + '</a>';
        },
        width: 88
    }, {
        text: 'Status Code',
        dataIndex: 'statusCode',
        width: 80
    }, {
        text: 'Division',
        dataIndex: 'division',
        width: 55
    }, {
        text: 'Location',
        dataIndex: 'location',
        width: 62
    }, {
        text: 'Union',
        dataIndex: 'union',
        width: 58
    }, {
        text: 'Line of Business',
        dataIndex: 'lob',
        width: 100
    }]
});