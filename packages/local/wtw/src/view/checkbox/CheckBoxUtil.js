Ext.define('WTW.view.CheckBox.CheckBoxUtil', {
    alternateClassName: 'CheckBoxUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            bindkey: 'bindkey',
            caption: 'boxLabel',
            children: 'items',
            columnSpan: 'colspan',
            description: "tooltip",
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            layout: 'layout',
            maxLength: 'maxLength',
            title: 'title',
            value: 'value',
            view: 'view',
            width: 'width'
        };

        config = UTIL.transformObject(config, mapperConfig, 'wtw-checkBox')

        config.margin = "10 0 0 0";
        config.inputValue = '1';

        if ('value' in config) {
            config.bind = {
                value: `{${config.bindkey}}`
            }

            delete config.value;
        }

        return config;
    }
});