Ext.define('WTW.view.grid.AdvanceSearch', {
    extend: 'Ext.grid.Panel',

    xtype: 'wtw-advance-search',

    cls: 'advancesearchgrid',

    viewModel: {
        data: {
            hideToValue: true
        }
    },

    tbar: [{
        xtype: 'button',
        text: 'Search',
        iconCls: 'x-fa fa-search',
        targetGrid: 'resultGrid',
        targetApi: {
            post: "getAdvanceSearchRecords"
        },
        handler: function (btn) {
            this.up('grid').onAdvancedSearch(btn);
        }
    }, {
        xtype: 'button',
        text: 'Add New Filter',
        iconCls: 'x-fas fa-plus',
        handler: function () {
            this.up('grid').onAddNewFilter();
        }
    }, {
        xtype: 'button',
        text: 'Remove Last Filter',
        iconCls: 'x-fas fa-times',
        handler: function () {
            this.up('grid').onRemoveLastFilter();
        }
    }],

    bbar: [{
        xtype: 'button',
        text: 'Search',
        iconCls: 'x-fa fa-search',
        targetGrid: 'resultGrid',
        targetApi: {
            post: "getAdvanceSearchRecords"
        },
        handler: function (btn) {
            this.up('grid').onAdvancedSearch(btn);
        }
    }, {
        xtype: 'button',
        text: 'Add New Filter',
        iconCls: 'x-fas fa-plus',
        handler: function () {
            this.up('grid').onAddNewFilter();
        }
    }, {
        xtype: 'button',
        text: 'Remove Last Filter',
        iconCls: 'x-fas fa-times',
        handler: function () {
            this.up('grid').onRemoveLastFilter();
        }
    }],

    plugins: {
        "ptype": "cellediting",
        "clicksToEdit": 1
    },

    store: Ext.create('Ext.data.Store', {
        fields: ['operatorName', 'tableName', 'columnName', 'match', 'fromValue', 'toValue', 'dataType'],
        data: [{}]
    }),

    columns: [{
        xtype: 'widgetcolumn',
        text: 'Operator',
        dataIndex: 'operatorName',
        width: 150,
        widget: {
            xtype: 'combobox',
            displayfield: 'text',
            name: 'operatorName',
            store: {
                data: [{ text: 'AND' }, { text: 'OR' }]
            },
            listeners: {
                change: function (cmp, value) {
                    this.up('grid').onValueChange(cmp, value);
                }
            }
        },
        onWidgetAttach: function (column, widget, record) {
            var rowIndex = column.getView().indexOf(record);

            if (rowIndex === 0) {
                widget.hide();
            } else {
                widget.show();
                if (rowIndex !== 1) {
                    widget.setDisabled(true);
                    widget.setValue(this.up('grid').getStore().getAt(1).get('operatorName'));
                } else {
                    widget.setValue('AND');
                }
            }
        }
    }, {
        xtype: 'widgetcolumn',
        text: 'Table',
        width: 150,
        dataIndex: 'tableName',
        widget: {
            xtype: 'combobox',
            displayField: 'displayValue',
            valueField: 'value',
            name: "tableName",
            listeners: {
                afterrender: function (cmp) {
                    var me = this;

                    DATA.get(URLS.url.getAdvanceSearchTables, {}, function (data) {
                        var store = Ext.create('Ext.data.Store', { data: data });
                        cmp.setStore(store);
                        cmp.setValue('Persons');
                    }, null, me);
                },
                change: function (cmp, value) {
                    this.up('grid').onTableChange(cmp, value);
                }
            }
        }
    }, {
        text: 'Column Name',
        xtype: 'widgetcolumn',
        dataIndex: 'columnName',
        width: 150,
        widget: {
            xtype: 'combobox',
            displayField: 'columnName',
            name: "columnName",
            listeners: {
                change: function (cmp, value) {
                    this.up('grid').onColumnChange(cmp, value);
                }
            }
        }
    }, {
        text: 'Match',
        xtype: 'widgetcolumn',
        dataIndex: 'match',
        width: 150,
        widget: {
            xtype: 'combobox',
            displayField: 'matchingName',
            name: "match",
            listeners: {
                change: function (cmp, value) {
                    this.up('grid').onValueChange(cmp, value);
                }
            }
        }
    }, {
        text: 'Value(s)',
        xtype: 'widgetcolumn',
        width: 400,
        dataIndex: 'fromValue',
        widget: {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                name: "fromValue",
                listeners: {
                    focusleave: function (cmp) {
                        this.up('grid').onValueChange(cmp, cmp.getValue());
                    }
                }
            }, {
                xtype: 'textfield',
                name: "toValue",
                reference: 'toValue',
                bind: {
                    hidden: '{hideToValue}'
                },
                listeners: {
                    focusleave: function (cmp) {
                        this.up('grid').onValueChange(cmp, cmp.getValue());
                    }
                }
            }]
        }
    }],

    onAddNewFilter: function () {
        this.getStore().add({});
    },

    onRemoveLastFilter: function () {
        var store = this.getStore(),
            count = store.getCount();

        if (count == 1) {
            UTIL.showWarning({ title: "Alert", message: "Advanced search requires at least 1 filter!" });
        }
        else if (count > 1) {
            store.removeAt(count - 1);
        }
    },

    onAdvancedSearch: function (btn) {
        var me = this,
            searchPanel = Ext.ComponentQuery.query('wtw-advance-search'),
            searchTab = this.up('panel[title="Advanced Search"]'),
            mySearchCombo = searchTab.down('combobox[cls="mysearchcombo"]'),
            store, allData, query = [], operator, mySearch = {};

        searchPanel.forEach(element => {
            store = element.getStore();

            allData = store.getData().items.map(function (record) {
                return record.getData();
            });

            query.push({ condition: allData });
        });

        if (mySearchCombo.getValue()) {
            mySearch = mySearchCombo.getSelectedRecord();
            mySearch.data.operatorName = "AND";
            delete mySearch.data.group;
            delete mySearch.data.name;
            query[0].condition.push(mySearch.data);
        }

        if (searchPanel.length > 1) {
            operator = searchTab.down('#conditionalOp').getValue();
        }

 
        me.up('centerview').getController().onSearch(btn, {
            query,
            conditionaloperator: operator
        }, true);
    },

    onValueChange: function (cmp, value) {
        var record = Ext.isFunction(cmp.getWidgetRecord) ? cmp.getWidgetRecord() : cmp.up().getWidgetRecord(),
            store = this.getStore(),
            rowIndex = store.indexOf(record);

        if (cmp.name === 'match') {
            this.getViewModel().set('hideToValue', !(value === 'Between'));
            if (value !== 'Between') {
                record.set('toValue', 'string');
            }
        }
        if (cmp.name === 'operatorName' && store.getCount() > 2) {
            store.each(function (rec, index) {
                if (index !== 0 && index !== rowIndex) {
                    rec.set('operatorName', value);
                }
            });
        }

        record.set(cmp.name, value);
        record.commit();
    },

    onTableChange: function (cmp, value) {
        var me = this,
            record = cmp.getWidgetRecord(),
            widgetColumn = this.down('widgetcolumn[dataIndex="columnName"]'),
            widget = widgetColumn.getWidget(record);

        if (cmp.selection) {
            DATA.get(URLS.url.getTableColumnNames, { id: 1, tableName: value }, function (data) {
                var store = Ext.create('Ext.data.Store', { data: data });
                widget.setStore(store);
                widget.setValue('Id');
            }, null, me);
        }
        record.set(cmp.name, value);
        record.commit();
    },

    onColumnChange: function (cmp, value) {
        var me = this,
            record = cmp.getWidgetRecord(),
            widgetColumn = this.down('widgetcolumn[dataIndex="match"]'),
            widget = widgetColumn.getWidget(record);

        if (cmp.selection) {
            DATA.get(URLS.url.getMatchingOperator, { id: 1, tableName: record.get('tableName'), columnName: value, dataType: cmp.selection.get('dataType') }, function (data) {
                var store = Ext.create('Ext.data.Store', { data: data });
                widget.setStore(store);
                widget.setValue(store.getAt(0));
            }, null, me);

            record.set('dataType', cmp.selection.get('dataType'));
        }
        record.set(cmp.name, value);
        record.commit();
    }
});
