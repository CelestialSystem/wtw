Ext.define('WTW.view.button.SplitButtonUtil', {
    alternateClassName: 'SplitButtonUtil',

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
            menu: 'menu',
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

        return UTIL.transformObject(config, mapperConfig, 'splitbuton')
    },

    createMenuTabButton: function (config) {
        if (config.buttonmenu) {
            var menuArr = []
            config.buttonmenu.forEach(function (cfg) {
                menuArr.push(MenuButtonUtil.configure(cfg))
            })

            config.tabConfig = {

                xtype: 'wtw-splitbutton',
                text: config.title,
                cls: config.cls,
                handler: function () {
                    var tabPanel = this.up('tabpanel'),
                        tab = tabPanel.child(`#${config.itemId}`),
                        tabLayout = tab.getLayout(),
                        childItem = tab.child(),
                        parentTab = tabPanel.up('tabpanel');

                    if (childItem.isToolbar) {
                        childItem = tab.getRefItems()[1];
                    }

                    tabPanel.setActiveItem(tab);
                    if (tabLayout.type === 'card') {
                        tabLayout.setActiveItem(childItem);
                    }

                    parentTab && parentTab.setTitle('Employee > ' + tab.title);
                },
                menu: {
                    items: menuArr
                }
            }
        }
    }
});
