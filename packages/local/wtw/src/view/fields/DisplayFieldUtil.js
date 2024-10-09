Ext.define('WTW.view.fields.DisplayFieldUtil', {
    alternateClassName: 'DisplayFieldUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            description: "tooltip",
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            labelSeparator: 'labelSeparator',
            margin: 'margin',
            maxLength: 'maxLength',
            style: 'style',
            trigger: 'trigger',
            value: 'value',
            view: 'view',
            width: 'width'
        };


        config.margin = config.margin ? config.margin : "10 0 0 0";

        config = UTIL.transformObject(config, mapperConfig, 'wtw-displayfield')
        config.name = config.bindkey || config.name;
        if ('value' in config) {
            config.bind = {
                value: `{${config.name}}`
            }

            delete config.value;
        }
        config.style = {
            paddingRight: '20px'
        }
        return config;
    }
});