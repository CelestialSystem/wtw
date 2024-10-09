Ext.define('WTW.button.ClearFilter', {
    extend: "Ext.button.Button",
    xtype: 'wtw-grid-clear-filterbar-button',
    hidden: true,
    itemId: 'clearColumnFiltersButton',
    iconCls: 'x-fa fa-eraser',
    tooltip: 'Click here to clear all column filters.',
    text: 'Click here to clear all column filters.',
    initComponent: function () {
        this.callParent();
        this.on('render', function (button) {
            // Verify it's being used in a grid with a filterbar

            var grid = button.up('grid');
            if (!grid) console.log('Error: The ' + this.$className + ' can only be used within a grid.');

            var plugin = grid.findPlugin('gridfilterbar');
            if (!plugin) console.log('Error: The ' + this.$className + ' is being used in a grid that does not have the gridfilterbar plugin.');

            this.filterbar = plugin; // Convenience property used in the handler. 

            grid.on('filterchange', this.onFilterChange, this);

        }, this);
    },
    onFilterChange: function (store) {
        var me = this;
        // Hide or show the eraser when there are column filters. There can be
        // other filters in effect too. The plugin tags its filters with the
        // isGridFilter property. Only consider those.
        var hidden = true;
        var filters = store.getFilters().items;
        for (var i = 0; i < filters.length; i++) {
            if (filters[i].isGridFilter) {
                hidden = false;
                break;
            }
        }
        me.setHidden(hidden);
    },
    handler: function (button) {
        var filterbar = this.filterbar,
            fields = filterbar.bar.query('daterangepicker,field'),
            len = fields.length,
            i;
        for (i = 0; i < len; i++) {
            fields[i].xtype === 'daterangepicker' ? fields[i].clearFilter() : fields[i].setValue();
        }
        filterbar.clearFilters();
    }
});