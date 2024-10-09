Ext.define('WTW.view.button.MenuButtonUtil', {
    alternateClassName: 'MenuButtonUtil',

    singleton: true,

    configure: function (config) {
        var mapperConfig = {
            action: 'handler',
            buttonIcon: 'iconCls',
            caption: 'text',
            columnName: 'recordId',
            description: "tooltip",
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            maxLength: 'maxLength',
            menu: 'menu',
            name: "reference",
            searchParams: 'searchParams',
            title: 'title',
            view: 'view',
            width: 'width'
        };


        return UTIL.transformObject(config, mapperConfig, 'wtw-menubutton')
    },
});
