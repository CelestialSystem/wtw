Ext.define('WTW.view.FieldGroup.FieldGroupUtil', {
    alternateClassName: 'FieldGroupUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            bindkey: 'bindkey',
            caption: 'fieldLabel',
            children: 'items',
            columnSpan: 'colspan',
            description: "tooltip",
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            layout: 'layout',
            maxLength: 'maxLength',
            name: "reference",
            title: 'title',
            view: 'view',
            width: 'width'
        };


        return UTIL.transformObject(config, mapperConfig, 'wtw-fieldgroup')
    }
});