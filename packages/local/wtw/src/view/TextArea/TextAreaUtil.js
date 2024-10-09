Ext.define('WTW.view.TextArea.TextAreaUtil', {
    alternateClassName: 'TextAreaUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            columnSpan: 'colspan',
            description: "tooltip",
            emptyText: 'emptyText',
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            maxLength: 'maxLength',
            reference: 'reference',
            title: 'title',
            view: 'view',
            width: 'width'
        };

        config = UTIL.transformObject(config, mapperConfig, 'wtw-textarea')
        config.margin = config.margin ? config.margin : "10 0 0 0";

        if ('value' in config) {
            config.bind = {
                value: `{${config.bindkey}}`
            }

            delete config.value;
        }


        return config
    }
});