Ext.define('MyApp.view.main.employee.NewCalc',{
	extend: 'Ext.panel.Panel',
	xtype: 'new-calc',
    height:'100%',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items:[{
        xtype:'work-inprogress'
    }]
});
