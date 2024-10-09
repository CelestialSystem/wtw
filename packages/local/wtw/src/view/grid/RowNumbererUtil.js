Ext.define('WTW.view.grid.RowNumbererUtil', {
    alternateClassName: 'RowNumbererUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            caption: 'text',
            dataKey: 'dataIndex',
            height: 'height',
            width: 'width'
        };

        return UTIL.transformObject(config, mapperConfig, 'wtw-rownumberer')
    }
});
