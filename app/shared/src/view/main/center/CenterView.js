Ext.define('MyApp.view.main.center.CenterView', {
	extend: 'Ext.Container',
	xtype: 'centerview',
	requires:[
		'Ext.layout.container.Card'
	],
	controller: 'centerview',
	cls: 'centerview',
	layout: 'card',
	viewModel: {}
});
