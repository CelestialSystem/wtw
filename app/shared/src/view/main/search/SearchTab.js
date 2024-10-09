Ext.define('MyApp.view.main.search.SearchTab', {
    extend: 'Ext.panel.Panel',

    requires:[
        'Ext.layout.container.Fit',
        'Ext.tab.Panel',
        'Ext.form.Panel'
    ],

    xtype: 'search-tab',
    controller:'searchtabcontroller',

    bind:{
        title: '{heading}'
    },
    border:false,
    collapsible: true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    
    items:[{
        xtype:'tabpanel',
        reference: 'search-panel',
        height:'100%',
        items:[{
            xtype: 'search'
        },{
            xtype: 'advanced-search-tab',
            layout:'fit'
        },{
            xtype: 'most-recent-tab',
            layout:'fit'
        }],
        listeners:{
            tabchange: 'onSearchTabChange'
        }
    }]
});