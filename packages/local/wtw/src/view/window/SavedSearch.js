Ext.define('WTW.view.window.SavedSearch', {
    extend: 'Ext.window.Window',

    xtype: 'wtw-saved-search',
    viewModel: {
        data: {
            caption: null
        }
    },

    title: 'Saved Search',
    autoShow: true,
    modal: true,

    items:[{
        xtype: 'form',
        height: 100,
        width: 400,
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Caption',
            displayField: "caption",
            allowBlank: false,
            cls: 'mysearchcombo',
            name: 'caption',
            store: Ext.create('Ext.data.Store', {sortOnLoad: false, groupField: "type" }),
            listConfig: {
                tpl: [
                    '<tpl for=".">',
                        '<tpl if="xindex == 1 || parent[xindex - 2].type != values.type">',
                            '<div class="x-combo-list-header">{type}</div>',
                        '</tpl>',
                        '<li class="x-boundlist-item">{caption}</li>',
                    '</tpl>'
                ]
            },
            bind: {
                value: '{caption}'
            },
            listeners: {
                afterrender: function (cmp) {
                    var me = this;

                    DATA.get(URLS.url.getadvancesearchcriteria, {userEmail: SessionUtil.get("usermail")}, function (data) {
                        cmp.getStore().loadData(data);
                    }, null, me);
                },
            }
        }, {
            xtype: 'combobox',
            fieldLabel: 'Type',
            displayField:'text',
            name:'type',
            allowBlank: false,
            hidden: true,
            store: {
                data:[
                    {text:'My Saved Searches'},
                    {text: 'Shared Searches'},
                    {text: 'Data Restriction'}
                ]
            },
            bind: {
                hidden: '{!caption}'
            }
        }]
    }],

    bbar:['->',{
        text:'Close',
        handler: function(btn) {
            btn.up('wtw-saved-search').close();
        }
    },{
        text:'Save',
        handler: function(btn) {
            var win = btn.up('wtw-saved-search'),
                savesearch = {},
                formValues = win.down('form').getForm().getValues();

            savesearch.userEmail = SessionUtil.get("usermail");
            savesearch.caption = formValues.caption;
            savesearch.type = formValues.type;
            savesearch.searchRequest = win.queryParam;

            DATA.post(
                URLS.url.createadvancesearchcriteria,
                {
                    savesearch
                },
                function (data, opts) {
                    UTIL.showWarning({title: "Success", message:'The search was successfully saved!'})
                    win.close();
                },
                function (err) {
                    console.log(err);
                },
                this
            );
        }
    }]

});
