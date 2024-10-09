Ext.define('WTW.view.radioField.RadioFieldUtil', {
    alternateClassName: 'RadioFieldUtil',
    singleton: true,
    configure: function (config) {
        var mapperConfig = {
            caption: 'fieldLabel',
            columns: 'columns',
            columnSpan: 'colspan',
            description: "tooltip",
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            maxLength: 'maxLength',
            name: "reference",
            radiofields: 'items',
            title: 'title',
            value: 'inputValue',
            verticalOrientation: "vertical",
            view: 'view',
            width: 'width'
        };

        return UTIL.transformObject(config, mapperConfig, 'wtw-radiofield')
    }
});