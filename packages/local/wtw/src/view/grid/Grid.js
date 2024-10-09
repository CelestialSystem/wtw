Ext.define('WTW.view.grid.Grid', {
    extend: 'Ext.grid.Panel',

    xtype: 'wtw-grid',

    requires: [
        'Ext.grid.plugin.filterbar.FilterBar'
    ],
    showFilterbar: true,
    showExport: true,

    listeners: {
        afterrender: function () {
            var me = this,
                pagingToolbar = me.down('pagingtoolbar');

            if (me.showExport) {
                me.addPlugin({
                    ptype: "gridexporter"
                });
            }

            if (me.showFilterbar) {
                me.addPlugin({
                    ptype: 'gridfilterbar',
                    hidden: true
                });
            }

            if (pagingToolbar) {
                me.store.on('load', function (store, records, successful) {
                    if (successful) {
                        pagingToolbar.bindStore(store);
                    }
                });
            }
            me.setupHeaderAndFooterToolbars();
        },
    },

    addToolbarItemIf(toolbar, xtype, start) {
        var component = toolbar.down(xtype);

        if (component) {
            console.log(this.$className + ' is configuring an ' + xtype + ', but that is unnecessary.');
        } else {
            if (start) {
                component = toolbar.insert(0, {
                    xtype: xtype
                });
            } else {
                component = toolbar.add({
                    xtype: xtype
                });
            }
        }
        return component;
    },

    setupHeaderAndFooterToolbars: function () {
        var toolbar = this.getDockedItems();

        if (!toolbar.length) return; // Do nothing if there is no header toolbar.
        // To do - Revisiting grid headers
        if (!toolbar[0].isToolbar) return;

        toolbar = toolbar[0];

        if (this.showFilterbar) {
            this.addToolbarItemIf(toolbar, 'wtw-grid-clear-filterbar-button');
            this.addToolbarItemIf(toolbar, 'wtw-grid-toggle-filterbar-button');
        }

        if (this.showExport) {
            var component = this.addToolbarItemIf(toolbar, 'wtw-grid-download-button');

            component.on('beforeexport', (view, cfg) => {
                return this.fireEvent('beforeexport', this, cfg)
            });
        }
    }
});
