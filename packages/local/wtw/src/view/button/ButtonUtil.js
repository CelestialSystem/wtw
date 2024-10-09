Ext.define('WTW.view.button.ButtonUtil', {
    alternateClassName: 'ButtonUtil',

    singleton: true,

    configure: function (config) {
        var mapperConfig = {
            access: 'access',
            action: 'handler',
            buttonIcon: 'iconCls',
            caption: 'text',
            columnName: 'recordId',
            dataKey: 'dataKey',
            description: "tooltip",
            formBind: 'formBind',
            height: 'height',
            isPrimaryKeyMember: 'isPrimaryKeyMember',
            isRequired: 'allowBlank',
            name: "reference",
            parentId: 'parentId',
            previousGrid: 'previousGrid',
            renderScreen: 'renderScreen',
            searchParams: 'searchParams',
            selectedGrid: 'selectedGrid',
            targetApi: 'targetApi',
            targetGrid: 'targetGrid',
            targetStore: 'targetStore',
            targetTab: 'targetTab',
            title: 'title',
            view: 'view',
            width: 'width',
            maxLength: 'maxLength'
        };

        config = UTIL.transformObject(config, mapperConfig, 'wtw-button');

        return config
    },

    createButton: function (config) {
        if (config.tabBar.children) {
            config.tabBar.items = [];

            config.tabBar.children.forEach(function (child) {
                config.tabBar.items.push({
                    xtype: 'wtw-button',
                    text: child.attributeName,
                    iconCls: child.buttonIcon,
                    tooltip: child.description,
                    renderScreen: child.renderScreen,
                    handler: function () {
                        var tabPanel = this.up('tabpanel');

                        tabPanel.up('centerview').controller.renderwindow(this);
                    }
                });
            });

            delete config.tabBar.children;
        } else if (config.tabBar.items) {
            config.tabBar.items.forEach(function (child) {
                child.handler = function () {
                    var tabPanel = this.up('tabpanel');

                    tabPanel.up('centerview').controller.renderwindow(this);
                }

            });
        }
    }

});