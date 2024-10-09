Ext.define('MyApp.view.main.MainViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mainviewmodel',

    data: {
        heading: 'title',
        currentStep: 0
    },

    stores: {
        menu: {
            type: "tree",
            fields: [{
                name: 'text',
                mapping: 'label'
            }],
            root:{},
            listeners: {
                load: 'onLoaded',
                beforeload: 'onBeforeLoad',
                nodebeforeexpand : 'onBeforeExpand'
             },
            proxy: {
                type: 'ajax',
                reader: 'json',
                url: URLS.url.navigationtree
            },
            autoLoad: false
        },
    }
});
