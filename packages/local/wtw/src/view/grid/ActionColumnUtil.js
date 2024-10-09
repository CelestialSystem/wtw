Ext.define('WTW.view.grid.ActionColumnUtil', {
    alternateClassName: 'ActionColumnUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            caption: 'text',
            dataKey: 'dataIndex',
            flex: 'flex',
            height: 'height',
            hyperlink: 'hyperlink',
            margin: 'margin',
            style: 'style',
            trigger: 'trigger',
            width: 'width'
        };

        if (config.hyperlink) {
            config.renderer = function (value, metaData, record) {

                return '<div class="cls-hyperlinkStyle" recId="' + value + '">' + value + '</div>';
            };


        }

        return UTIL.transformObject(config, mapperConfig, 'wtw-actioncolumn')
    }
});
