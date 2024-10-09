Ext.define('WTW.view.form.FormUtil', {
    alternateClassName: 'FormUtil',

    singleton: true,

    configure: function (config) {
        var mapperConfig = {
            apiMetadata: 'api',
            buttonmenu: 'buttonmenu',
            bindkey: 'bindkey',
            caption: 'title',
            children: 'items',
            columnName: 'recordId',
            columnSpan: 'colspan',
            description: "tooltip",
            height: 'height',
            hidden: 'hidden',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            layout: 'layout',
            maxLength: 'maxLength',
            margin: 'margin',
            name: "reference",
            style: 'style',
            tabIcon: 'iconCls',
            title: 'title',
            trigger: 'trigger',
            view: 'view',
            width: 'width'
        };


        config = UTIL.transformObject(config, mapperConfig, 'wtw-formpanel');

        if (config.buttonmenu) {
            SplitButtonUtil.createMenuTabButton(config);
        }

        config.apiMetadata = config.api;

        config.layout = { type: 'table' }
        config.layout.columns = Number(config.maxColumns) || 1;

        config.scrollable = true;

        return config;
    }
});
