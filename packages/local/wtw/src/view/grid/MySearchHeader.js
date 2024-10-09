Ext.define('WTW.view.grid.MySearchHeader', {
    extend: 'Ext.container.Container',

    xtype: 'wtw-mysearch-header',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    reference: 'mysearch',
    width: '100%',

    items: [{
        xtype: 'combobox',
        fieldLabel: "My Searches",
        displayField: "caption",
        cls: 'mysearchcombo',
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
        store: Ext.create('Ext.data.Store', {sortOnLoad: false, groupField: "type" }),
        listeners: {
            change: function (cmp, newval) {
                this.up().onMySearchChange(cmp, newval);
            },
            expand: function (cmp) {
                var me = this;

                DATA.get(URLS.url.getadvancesearchcriteria, { userEmail: SessionUtil.get("usermail")}, function (data) {
                    cmp.getStore().loadData(data);
                }, null, me);
            },
        }
    }, {
        xtype: 'container',
        layout: 'hbox',
        reference: 'btnContainer',
        hidden: true,
        defaults: {
            xtype: 'button'
        },
        items: [{
            text: 'Run',
            iconCls: 'x-fa fa-search',
            targetGrid: 'resultGrid',
            targetApi: {
                post: "getAdvanceSearchRecords"
            },
            handler: function (btn) {
                this.up('container[reference="mysearch"]').runSearch(btn);
            }
        }, {
            text: 'Edit',
            iconCls: 'x-fas fa-pencil-alt',
            handler: function (btn) {
                this.up('container[reference="mysearch"]').editSearch(btn);
            }
        }, {
            text: 'Share',
            iconCls: 'x-fas fa-handshake',
            itemId: 'shareBtn',
            hidden: true,
            handler: function () {
                var me = this.up('container[reference="mysearch"]');

                Ext.Msg.confirm(
                    'Share',
                    'Are you sure?',
                    function (choice) {
                        if (choice === 'yes') {
                            Ext.Msg.confirm(
                                'Permissions',
                                'The search was successfully shared!Would you like to assign user group permissions now?',
                                function (choice) {
                                    if (choice === 'yes') {
                                        me.showPermissionsWindow();
                                    } else {
                                        console.log('User clicked No');
                                    }
                                }
                            );
                        } else {
                            console.log('User clicked No');
                        }
                    }
                );
            }
        }, {
            text: 'Delete',
            iconCls: 'x-fas fa-times',
            handler: function () {
                this.up('container[reference="mysearch"]').deleteSearch();
            }
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        reference: 'editbtnContainer',
        hidden: true,
        defaults: {
            xtype: 'button'
        },
        items: [{
            text: 'Exit Edit Mode',
            handler: function () {
                this.up('container[reference="mysearch"]').exitEditSearch();
            }
        }, {
            text: 'Save',
            handler: function () {
                this.up('container[reference="mysearch"]').onSaveEdit();
            }
        }]
    }, {
        xtype: 'component',
        flex: 1
    }, {
        xtype: 'button',
        text: 'TN Filter',
        iconCls: "x-fas fa-plane-departure"
    }],

    onMySearchChange: function (cmp, newval) {
        var shareBtn = this.down('#shareBtn'),
            rec;

        if (newval) {
            rec = cmp.getSelectedRecord();
            this.down('container[reference="btnContainer"]').setHidden(false);
            rec && shareBtn.setHidden((rec.get('type') === 'My Saved Searches'));
        }
    },

    runSearch: function (btn) {
        var me = this,
            data = me.down('combobox').getSelectedRecord().data;
       
        me.up('centerview').getController().onSearch(btn, {
            query: data.searchRequest.query,
            conditionaloperator: data.searchRequest.conditionaloperator
        }, true);
    },

    editSearch: function (btn) {
        var rec = this.down('combobox').getSelectedRecord();

        this.up('panel').down('wtw-advance-search').getStore().loadData(rec.data.searchRequest.query[0].condition);
        this.down('container[reference="btnContainer"]').setHidden(true);
        this.down('container[reference="editbtnContainer"]').setHidden(false);
        this.editRecord = rec;
    },

    exitEditSearch: function () {
        this.down('container[reference="btnContainer"]').setHidden(false);
        this.down('container[reference="editbtnContainer"]').setHidden(true);
    },

    deleteSearch: function () {
        var me = this,
            combo = this.down('combobox'),
            rec = combo.getSelectedRecord();

        Ext.Msg.confirm(
            'Delete',
            'Are you sure?',
            function (choice) {
                if (choice === 'yes') {
                    DATA.delete(URLS.url.deleteadvancesearchcriteria, { id: rec.get('id') }, function () {
                        combo.getStore().remove(rec);
                        combo.clearValue();
                        UTIL.showWarning({ title: "Success", message: 'The saved search was deleted successfully!' });
                    }, null, me);
                } else {
                    console.log('User clicked No');
                }
            }
        );
    },

    showPermissionsWindow: function () {
        Ext.create('Ext.window.Window', {
            title: 'Permissions',
            width: 500,
            height: 600,
            autoShow: true,
            items: [{
                xtype: 'panel',
                layout: 'card',
                reference: 'cardpanel',
                items: [
                    {
                        xtype: 'panel',
                        padding: 10,
                        itemId: 'panel1',
                        title: 'Enter the permission name for the shared search',
                        items: [
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Cation',
                                required: true,
                                store: {
                                    data: [{
                                        "name": "Default Shared Permissions", "group": "Enter new permission or select from list"
                                    }],
                                    groupField: "group"
                                },
                                listConfig: {
                                    tpl: [
                                        '<tpl for=".">',
                                        '<tpl if="xindex == 1 || parent[xindex - 2].group != values.group">',
                                        '<div class="x-combo-list-header">{group}</div>',
                                        '</tpl>',
                                        '<li class="x-boundlist-item">{name}</li>',
                                        '</tpl>'
                                    ]
                                },
                                displayField: 'name'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        padding: 10,
                        itemId: 'panel2',
                        title: 'Select user groups that can use the shared search',
                        items: [{
                            xtype: 'checkboxgroup',
                            columns: 2,
                            vertical: true,
                            items: [
                                { boxLabel: 'Actuary', name: 'option1', inputValue: '1' },
                                { boxLabel: 'Call Center PM', name: 'option2', inputValue: '2' },
                                { boxLabel: 'Power User', name: 'option3', inputValue: '3' },
                                { boxLabel: 'Read Only with Calc', name: 'option4', inputValue: '4' },
                                { boxLabel: 'Call Center', name: 'option5', inputValue: '5' },
                                { boxLabel: 'Data Load', name: 'option6', inputValue: '6' },
                                { boxLabel: 'Read Only View Calc', name: 'option7', inputValue: '7' }
                            ]
                        }]
                    }
                ],
            }],
            bbar: ['->', {
                text: 'Close',
                handler: function (btn) {
                    btn.up('window').close();
                }
            }, {
                    text: 'Previous',
                    disabled: true,
                    handler: function (btn) {
                        var win = btn.up('window');
                        var panel = win.down('panel[reference="cardpanel"]').getLayout();
                        var currentIndex = panel.getActiveItem().itemId.replace('panel', '') - 1;
                        if (currentIndex > 0) {
                            panel.setActiveItem(currentIndex - 1);
                            win.down('button[text=Next]').setDisabled(false);
                            btn.setDisabled(true);
                        }
                    }
                }, {
                    text: 'Next',
                    handler: function (btn) {
                        var win = btn.up('window');
                        var panel = win.down('panel[reference="cardpanel"]').getLayout();
                        var currentIndex = panel.getActiveItem().itemId.replace('panel', '') - 1;
                        if (currentIndex < 1) {
                            panel.setActiveItem(currentIndex + 1);
                            win.down('button[text=Previous]').setDisabled(false);
                            btn.setDisabled(true);
                        }
                    }
                }, {
                    text: 'Save'
                }]
        });
    },

    onSaveEdit: function () {
        var savesearch = {},
            searchPanel = Ext.ComponentQuery.query('wtw-advance-search'),
            rec = this.editRecord,
            store, allData, query = [];

        searchPanel.forEach(element => {
            store = element.getStore();

            allData = store.getData().items.map(function (record) {
                return record.getData();
            });

            query.push({ condition: allData });
        });

        savesearch.userEmail = SessionUtil.get("usermail");
        savesearch.caption = rec.get('caption');
        savesearch.type = rec.get('type');
        savesearch.searchRequest = {};
        savesearch.searchRequest.query = query;
        // savesearch.searchRequest.conditionaloperator = rec.data.searchRequest.conditionaloperator;
        savesearch.searchRequest.conditionaloperator = "string";
        savesearch.id = rec.get('id');

        DATA.put(
            URLS.url.updateadvancesearchcriteria,
            {
                savesearch
            },
            function (data, opts) {
                UTIL.showWarning({ title: "Success", message: 'The search was edited successfully!' })
                win.close();
            },
            function (err) {
                console.log(err);
            },
            this
        );
    }

});
