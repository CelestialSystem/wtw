Ext.define('WTW.util.FormEngine', {
    singleton: true,

    alternateClassName: 'FormEngine',

    parseLayout: function (data) {

        this.data = data;
        var extViewConfig = {};

        this.parseElement(data.layoutSet.form, extViewConfig);

        extViewConfig.viewModel = {};

        return extViewConfig;
    },

    parseElement: function (data, viewConfig, store) {
        var me = this,
            transformedObject = me.getTransformedConfigObj(data),
            configObj,
            childKey;

        if (transformedObject.popup) {
            UTIL.popupwindows[transformedObject.attributeName] = transformedObject;
        } else {
            Ext.isArray(viewConfig)
                ? viewConfig.push(transformedObject)
                : Object.assign(viewConfig, transformedObject);
        }

        configObj = viewConfig.xtype ? viewConfig : transformedObject;

        if (data.header) {
            this.parseToolbar(data, configObj, 'tbar')

        }
        if (data.footer) {
            this.parseToolbar(data, configObj, 'bbar')
        }


        //Todo need to remove once for hidden tab override is added
        if (configObj.tabTitle) {
            configObj.tabConfig = {
                title: configObj.tabTitle,
                reference: configObj.reference + "tab"
            };
        }

        if (data.children && Ext.isArray(data.children)) {
            childKey = TypeMapper.childKey[configObj.xtype] || "items";
            configObj[childKey] = [];

            data.children.forEach((element) => {
                me.parseElement(element, configObj[childKey]);
            });

            delete configObj.children;
        }
    },

    parseToolbar: function (data, configObj, type) {
        var me = this,
            bar = type === 'tbar' ? configObj.header : configObj.footer;

        configObj[type] = [];
        bar.forEach((element) => {
            me.parseElement(element, configObj[type]);
        });

        if (type === 'tbar') {
            delete configObj.header
        }

        if (type === 'bbar') {
            delete configObj.footer
        }
    },

    getTransformedConfigObj: function (data) {
        var mapperObject = TypeMapper.classMapping[data.type],
            appliedEntityObj = Ext.apply(data, this.data.entitySet.attributes[data.attributeName]),
            configuredObject = mapperObject ? mapperObject.configure(appliedEntityObj) : data;

        return configuredObject;
    }
});
