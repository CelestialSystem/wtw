Ext.define('MyApp.view.nav.menu.MenuView', {
	extend: 'Ext.list.Tree',
	requires: [
		'Ext.data.TreeStore',
	],

	xtype: 'menuview',
	controller:'menuviewcontroller',

	ui: 'nav',
	scrollable: true,
	
	listeners: {
		itemclick: 'onLeftMenuSelectionChange'
	},
});
