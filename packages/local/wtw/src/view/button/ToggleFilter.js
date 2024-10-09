Ext.define('WTW.button.ToggleFilter', {
    extend: "Ext.button.Button",
    xtype: 'wtw-grid-toggle-filterbar-button',
    iconCls: 'x-fa fa-filter',
    text: 'Click to show or hide the filter bar.',
    lookupparent: 'grid',
    tooltip: "Click to show the filter bar.",
    handler: function (button) {
        var grid = button.up(button.lookupparent);
        if (grid) {
            var plugin = grid.findPlugin('gridfilterbar');
            if (plugin) {
                var bar = plugin.getBar();
                var hidden = bar.getHidden();
                if (hidden) {
                    plugin.showFilterBar();
                } else {
                    plugin.hideFilterBar();
                }
                this.setTooltip('Click to ' + (bar.getHidden() ? 'show' : 'hide') + ' the filter bar.');
            } else {
                console.log('Error: The ' + this.$className + ' is being used in a grid that does not have the gridfilterbar plugin.');
            }
        } else {
            console.log('Error: The ' + this.$className + ' can only be used within a grid.');

        }
    }
});