Ext.define('WTW.view.grid.PagingBar', {
    extend: 'Ext.toolbar.Paging',

    xtype: 'wtw-pagingbar',
    width: '100%',
    displayInfo: true,
    displayMsg: 'Displaying {0} - {1} of {2}',
    items: [ {
            xtype: 'tbtext',
            text: 'Page loaded:' + new Date().toLocaleString()
        }
    ]
});
