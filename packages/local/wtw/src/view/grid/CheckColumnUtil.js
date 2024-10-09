Ext.define('WTW.view.grid.CheckColumnUtil', {
    alternateClassName: 'CheckColumnUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            caption: 'text',
            dataKey: 'dataIndex',
            flex: 'flex',
            headerCheckbox: 'headerCheckbox',
            height: 'height',
            width: 'width'
        };

        config.width = 50;
        config.dataIndex = 'is_locked';
        config.headerCheckbox = true;

        config = UTIL.transformObject(config, mapperConfig, 'wtw-checkcolumn')

        Ext.applyIf(config, {
            listeners: {
                checkchange: function (checkColumn, rowIndex, checked, eOpts) {
                    console.log(rowIndex);
                    Ext.fireEvent('checkcolumnclick', {
                        checkColumn,
                        rowIndex,
                        checked
                    })
                }
            }
        });

        return config;
    }
});
