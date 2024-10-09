Ext.define('WTW.view.grid.PagingBarUtil', {
    alternateClassName: 'PagingBarUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            displayInfo: 'displayInfo',
            displayMsg: 'displayMsg',
            height: 'height',
            name: 'reference',
            store: 'store',
            width: 'width'
        };

        return UTIL.transformObject(config, mapperConfig, 'wtw-pagingbar')
    }
});
