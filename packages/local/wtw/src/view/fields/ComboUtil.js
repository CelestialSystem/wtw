Ext.define('WTW.view.fields.ComboUtil', {
    alternateClassName: 'ComboUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            api: 'api',
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            columnName: 'recordId',
            columnSpan: 'colspan',
            description: "tooltip",
            displayField: 'displayField',
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            margin: 'margin',
            maxLength: 'maxLength',
            store: 'store',
            title: 'title',
            trigger: 'trigger',
            value: 'value',
            valueField: 'valueField',
            view: 'view',
            width: 'width'
        };


        config.margin = "10 0 0 0";

        if (config.store && config.api) {
            config.store = UTIL.prepareStore(config.api);
        }

        config = UTIL.transformObject(config, mapperConfig, 'wtw-combo');

        // Map trigger action if it exists
        if ('trigger' in config) {
            // config.triggerAction = config.trigger.triggerAction;
            config.trigger.forEach(function (action) {
                config['triggerAction' + action.triggerAction] = action.triggerAction
            })
        }

        config.name = config.attributeName;
        config.name = config.bindkey || config.name

        if ('value' in config) {
            config.bind = {
                value: `{${config.name}}`
            }

            delete config.value;
        }

        return config;
    }
});