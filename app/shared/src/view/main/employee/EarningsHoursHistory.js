Ext.define('MyApp.view.main.employee.EarningsHoursHistory', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.toolbar.Paging'
    ],

    xtype: 'earnings-hours-history-tab',
    viewModel: 'earnings-hours-history-vm',
    border: false,
    closable: false,
    width: '100%',
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
        width: '100%',
        bind: {
            store: '{earningsHoursHistory}'
        },
        displayInfo: true,
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
        store: '{earningsHoursHistory}'
    },

    columns: [{
        xtype: 'rownumberer'
    }, {
        text: 'Date',
        dataIndex: 'date',
        renderer: function (value) {
            return '<a href="#">' + value + '</a>';
        },
        width: 74
    }, {
        text: 'Eligible Hours',
        dataIndex: 'eligibleHours',
        width: 87
    }, {
        text: 'Pensionable Earnings',
        dataIndex: 'pensionableEarnings',
        width: 124
    }, {
        text: 'Comp Class',
        dataIndex: 'compClass',
        width: 78
    }, {
        text: 'Payroll Date',
        dataIndex: 'payrollDate',
        width: 79
    }, {
        text: 'Regular Earnings',
        dataIndex: 'regularEarnings',
        width: 100
    }, {
        text: 'Overtime',
        dataIndex: 'overtime',
        width: 67
    }, {
        text: 'Bonus',
        dataIndex: 'bonus',
        width: 51
    }, {
        text: 'Regular Deferrals',
        dataIndex: 'regularDeferrals',
        width: 103
    }, {
        text: 'Bonus Deferrals',
        dataIndex: 'bonusDeferrals',
        width: 97
    }, {
        text: 'Non Eligible Hours',
        dataIndex: 'nonEligibleHours',
        width: 110
    }]
});