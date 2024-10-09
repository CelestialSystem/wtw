Ext.define('MyApp.view.main.MainView', {
    extend: 'Ext.container.Container',

    requires: [
        'Ext.layout.container.Border',
        'Ext.form.FieldContainer',
        'Ext.form.FieldSet'
    ],

    xtype: 'employee-search',
    controller: 'mainviewcontroller',
    viewModel: 'mainviewmodel',
    listeners: {
        afterrender: 'onMainViewRender'
    },
    layout: 'border',
    items: [
        {
            xtype: 'toolbar',
            region: 'north',
            height: 60,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'image',
                    src: './resources/desktop/ABC_company.png',
                    width: 200,
                    height: 40
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'image',
                    src: 'https://eepoint-uat.wtwco.us/AFrame_v1.0.0_453/styles/ext_cobalt/Images/primary-logo.gif',
                    height: 40
                },
                {
                    xtype: 'tbfill'
                },
                {
                    html: '<div>UAT</div>',
                    style: {
                        cursor: 'default',
                        border: 'none',
                        background: 'none'
                    }
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    iconCls: "x-fa fa-arrow-right",
                    tooltip: '<div style="white-space: nowrap;">eepoint Information</div>',
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    iconCls: "x-fa fa-palette",
                    tooltip: '<div style="white-space: nowrap;">Themes</div>',
                    menu: {
                        items: [
                            {
                                text: 'Classic',
                                name: 'classic'
                            },
                            {
                                text: 'Triton',
                                name: 'triton'
                            },
                            {
                                text: 'Neptune',
                                name: 'neptune'
                            },
                            {
                                text: 'Material',
                                name: 'material'
                            },
                            {
                                text: 'Gray',
                                name: 'gray'
                            },
                            {
                                text: 'Crisp',
                                name: 'crisp'
                            },
                            {
                                text: 'Crisp Touch',
                                name: 'crisptouch'
                            },
                            {
                                text: 'Aria',
                                name: 'aria'
                            }
                        ],
                        listeners: {
                            click: 'changeTheme'
                        },
                    },
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    iconCls: "x-fa fa-key",
                    tooltip: '<div style="white-space: nowrap;">Change Password</div>',
                },
                {
                    xtype: 'tbseparator'
                },
                {
                    xtype: 'button',
                    iconCls: "x-fa fa-power-off",
                    tooltip: '<div style="white-space: nowrap;">Log Out</div>',
                    handler: 'onLogout'
                }
            ]
        },
        {
            xtype: "leftnavview",
            region: "west"
        },
        { xtype: 'footerview', reference: 'footerview', region: 'south', docked: 'bottom' },
        { xtype: 'centerview', reference: 'centerview', region: 'center' },
    ]
});
