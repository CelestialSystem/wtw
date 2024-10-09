Ext.define('WTW.view.fields.FieldUtil', {
    alternateClassName: 'FieldUtil',
    singleton: true,
    configure: function(config) {
        var mapperConfig = {
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            columnName: 'recordId',
            columnSpan: 'colspan',
            description: "tooltip",
            height: 'height',
            hidden: 'hidden',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            labelSeparator: 'labelSeparator',
            labelWidth: 'labelWidth',
            margin: 'margin',
            maxLength: 'maxLength',
            style: 'style',
            title: 'title',
            trigger: 'trigger',
            validator: 'validator',
            view: 'view',
            width: 'width'
        };
      
          config.margin = "10 0 0 0";
          config =  UTIL.transformObject(config, mapperConfig, 'wtw-textfield');
          config.name = config.attributeName;

          config.name = config.bindkey || config.name;
          
          // Map trigger action if it exists
          if ('trigger' in config) {
            config.triggerAction = config.trigger.triggerAction;
            config.trigger.forEach(function (action) {
              config['triggerAction' + action.triggerAction] = action.triggerAction
            })
          }

          // Bind value if present in the config and remove original value key
          if('value' in config){
            config.bind = {
                value: `{${config.name}}`
            }

            delete config.value;
          }

          if(config.validator){
            config = Validators.parseValidator(config);
          }

          return config;
    }
});