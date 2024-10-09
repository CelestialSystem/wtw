Ext.define('MyApp.view.main.employee.CombinedHistory',{
	extend: 'Ext.panel.Panel',
	xtype: 'combined-history',
    height:'100%',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[{
        xtype:'work-inprogress'
    }]
});
