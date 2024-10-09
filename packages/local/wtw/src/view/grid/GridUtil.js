Ext.define('WTW.view.grid.GridUtil', {
    alternateClassName: 'GridUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            api: 'api',
            buttonmenu: 'buttonmenu',
            caption: 'title',
            collapsed: 'collapsed',
            collapsible: 'collapsible',
            flex: 'flex',
            height: 'height',
            hidden: 'hidden',
            maxHeight: 'maxHeight',
            name: 'reference',
            selModel: 'selModel',
            showCheckColumn: 'showCheckColumn',
            showExport: 'showExport',
            showFilterbar: 'showFilterbar',
            showGrouping: 'showGrouping',
            showRowNumber: 'showRowNumber',
            store: 'store',
            tabIcon: 'iconCls',
            width: 'width'
        };

        // Prepare store if config.store and config.api exist
        if (config.store && config.api) {
            config.store = UTIL.prepareStore(config.api, config.infiniteGrid);
        }

        config.children = config.children || [];

        // Add row numberer if not already added
        if (config.showRowNumber && !config.children.some(child => child.type === 'rownumberer')) {
            config.children.unshift({
                "type": "Rownumberer"
            });
        }

        // Add check column if not already added
        if (config.showCheckColumn && !config.children.some(child => child.type === 'checkColumn')) {
            config.children.unshift({
                "type": "CheckColumn"
            });
        }

        // Transform object with mapping config
        config = UTIL.transformObject(config, mapperConfig, 'wtw-grid');

        // Create a split button menu if buttonmenu exists
        if (config.buttonmenu) {
            SplitButtonUtil.createMenuTabButton(config);
        }

        // Handle selModel creation for checkbox selection
        if (config.selModel) {
            config.selModel = {
                selType: 'checkboxmodel', // Use checkboxmodel to integrate with selections
                mode: 'MULTI'
            }
        }

        // Enable scrolling
        config.scrollable = true;

        if (config.showGrouping) {
            config.features = [{ ftype: 'grouping' }];
        }

        return config;
    }
});
