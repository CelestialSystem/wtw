Ext.define('WTW.view.panel.PanelUtil', {
    alternateClassName: 'PanelUtil',

    singleton: true,

    configure: function (config) {
        var mapperConfig = {
            caption: 'title',
            children: 'items',
            cls: 'cls',
            collapsible: 'collapsible',
            columnName: 'recordId',
            columnSpan: 'colspan',
            description: "tooltip",
            height: 'height',
            html: 'html',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            maxLength: 'maxLength',
            name: "reference",
            scrollable: 'scrollable',
            tabIcon: 'iconCls',
            view: 'view',
            width: 'width'
        };

        config = UTIL.transformObject(config, mapperConfig, 'wtw-panel');

        if (config.buttonmenu) {
            SplitButtonUtil.createMenuTabButton(config);
        }

        config = UTIL.transformObject(config, mapperConfig, 'wtw-panel')

        if (!config.layout) {
            config.layout = { type: 'table' }
        }
        else {
            config.layout = config.layout
        }
        config.layout.columns = Number(config.maxColumns) || 1;

        config.scrollable = true;

        return config;
    }
});
