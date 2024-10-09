Ext.define('WTW.view.field.DateFieldUtil', {
    alternateClassName: 'DateFieldUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            columnName: 'recordId',
            columnSpan: 'colspan',
            description: "tooltip",
            format: 'format',
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            margin: 'margin',
            maxLength: 'maxLength',
            title: 'title',
            trigger: 'trigger',
            view: 'view',
            width: 'width'
        };


        config.margin = config.margin ? config.margin : "10 0 0 0";

        config = UTIL.transformObject(config, mapperConfig, 'wtw-datefield')
        config.name = config.attributeName;

        config.name = config.bindkey || config.name


        // Map trigger action if it exists
        if ('trigger' in config) {
            config.triggerAction = config.trigger.triggerAction;
            config.trigger.forEach(function (action) {
                config['triggerAction' + action.triggerAction] = action.triggerAction
            })
        }

        if ('value' in config) {
            config.bind = {
                value: `{${config.name}}`
            }

            delete config.value;
        }
        return config;
    }
});