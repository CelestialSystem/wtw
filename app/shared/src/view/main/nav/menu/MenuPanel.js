Ext.define('MyApp.view.nav.menu.MenuPanel', {
	extend: 'Ext.tree.Panel',
	requires: [
		'Ext.data.TreeStore',
	],

	xtype: 'menupanel',
	scrollable: true,
    rootVisible:false,
    padding: 10,
    bind:{
        store: '{menu}'
    }
});
