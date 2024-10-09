Ext.define('WTW.view.panel.AdvanceSearchPanel', {
    extend: 'Ext.container.Container',

    xtype: 'wtw-advancesearch-panel',

    layout: 'hbox',
    defaults: {
        xtype: 'button'
    },
    items: [{
        text: 'Add Condition',
        handler: function () {
            var parentPanel = this.up('panel[reference="paneltoadd"]'),
                idx = parentPanel.items.getCount() - 1;

            if (idx === 2) {
                var header = parentPanel.up('panel[attributeName="advanceSearchTab"]').down('toolbar[dock="top"]');
                var newCombo = {
                    xtype: 'combobox',
                    fieldLabel: 'Condition Operator',
                    store: ['AND', 'OR'],
                    queryMode: 'local',
                    value: 'AND',
                    itemId: 'conditionalOp'
                };
                header.insert(0, newCombo);
            }

            var newPanel = Ext.create('Ext.panel.Panel', {
                title: 'Condition ' + idx,
                width: '100%',
                collapsible: true,
                items: [{
                    xtype: 'wtw-advance-search',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['operator', 'tableName', 'columnName', 'match', 'fromValue', 'toValue'],
                        data: [{}]
                    }),
                    tableStore: {
                        data: [{
                            text: "Employee",
                            value: "Persons"
                        }]
                    }
                }]
            });

            parentPanel.insert(parentPanel.items.getCount() - 2, newPanel);
        }
    }, {
        text: 'Remove Last Condition',
        handler: function () {
            var parentPanel = this.up('panel[reference="paneltoadd"]'),
                idx = parentPanel.items.getCount() - 3,
                itemToRemove = parentPanel.items.getAt(idx);

            if (idx >= 1) {
                parentPanel.remove(itemToRemove);

                if (idx === 1) {
                    var header = parentPanel.up('panel[attributeName="advanceSearchTab"]').down('toolbar[dock="top"]');

                    header.remove(header.items.getAt(0));
                }
            }
        }
    }, {
        text: 'Clear Condition(s)',
        handler: function () {
            var parentPanel = this.up('panel[reference="paneltoadd"]'),
                header = parentPanel.up('panel[attributeName="advanceSearchTab"]').down('toolbar[dock="top"]'),
                store = parentPanel.down('wtw-advance-search').getStore();

            if(header.items.getAt(0).itemId === 'conditionalOp'){
                header.remove(header.items.getAt(0));
                parentPanel.removeAll();
                parentPanel.add(parentPanel.initialConfig);
            }

            if (store.getCount() > 1) {
                store.remove(store.getRange(1, store.getCount() - 1));
            }
        }
    }]
});
