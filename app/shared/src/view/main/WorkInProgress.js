Ext.define('MyApp.view.main.WorkInProgress', {
    extend: 'Ext.container.Container',
    xtype: 'work-inprogress',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    height: '100%',

    items: [{
        xtype: 'dataview',
        itemSelector: 'div.thumb-wrap',
        tpl: '<tpl>' +
            '<div class="thumb-wrap">' +
            '<img src="./resources/desktop/work-inprogress.png" />' +
            '<br/><span style="font-size: x-large;">Work In-progress...</span>' +
            '</div>' +
            '</tpl>'
    }
    ]
})