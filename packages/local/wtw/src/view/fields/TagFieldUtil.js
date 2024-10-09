Ext.define('WTW.view.field.TagFieldUtil', {
    alternateClassName: 'TagFieldUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            api: 'api',
            autoLoad: 'autoload',
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            columnName: 'recordId',
            columnSpan: 'colspan',
            description: "tooltip",
            displayField: 'displayField',
            grow: 'grow',
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            labelWidth: 'labelWidth',
            margin: 'margin',
            maxLength: 'maxLength',
            multiSelect: 'multiSelect',
            store: 'store',
            style: 'style',
            title: 'title',
            trigger: 'trigger',
            valueField: 'valueField',
            view: 'view',
            width: 'width'
        };

        config.margin = config.margin ? config.margin : "10 0 0 0";

        if (config.store && config.api) {
            config.store = UTIL.prepareStore(config.api);
        }

        config = UTIL.transformObject(config, mapperConfig, 'wtw-tagfield');
        // config.name = config.attributeName;

        // Map trigger action if it exists
        if ('trigger' in config) {
            // config.triggerAction = config.trigger.triggerAction;
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
        config.style = {
            textAlign: "left"
        }
        return config;
    }
});