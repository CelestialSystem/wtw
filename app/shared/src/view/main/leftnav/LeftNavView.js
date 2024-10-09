Ext.define("MyApp.view.main.leftnav.LeftNavView", {
	extend: "Ext.panel.Panel",
	xtype: "leftnavview",

	requires: [
		'Ext.layout.container.Accordion',
		'Ext.layout.container.Fit'
	],

	layout: "fit",
	collapsible: true,
	title: '',
	cls: 'left-nav',

	items:[{
		xtype: 'panel',
		width: 250,
		border: false,
		layout: {
			// layout-specific configs go here
			type: 'accordion',
			titleCollapse: false,
			animate: true,
			activeOnTop: false
		},
		items: [{
			title: 'Main Menu',
			scrollable:'y',
			items:[{
				xtype:'menuview',
				bind:{
					store: '{menu}'
				}
			}]
		},{
			title: 'Quantify Jobs',
			html: 'Panel content!'
		},{
			title: 'Configuration',
			html: 'Panel content!'
		},{
			title: 'System Setup',
			html: 'Panel content!'
		},{
			title: 'Custom Security',
			html: 'Panel content!'
		}],
	}]
});