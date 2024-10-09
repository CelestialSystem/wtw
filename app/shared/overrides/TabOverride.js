Ext.define('MyApp.overrides.TabOverride', {
    override: 'Ext.tab.Bar',

    /**
     * Override the closeTab method to prevent closing the panel
     * if the panel's reference is the 'workSheetGrid', and hide the panel instead
     */
    closeTab: function(toClose) {
        var me = this,
            card = toClose.card,
            tabPanel = me.tabPanel,
            toActivate;

        // Check if the card (panel) reference is 'workSheetGrid'
        if (card && card.reference === 'workSheetGrid') {
            // Hide the card (panel) instead of closing it
            toClose.setHidden(true);
            card.setHidden(true);

            // Find the next activatable tab
            toActivate = me.findNextActivatable(toClose);

            if (toActivate) {
                // Set the next tab as the active one
                if (tabPanel) {
                    tabPanel.setActiveTab(toActivate.card);
                } else {
                    me.setActiveTab(toActivate);
                }

                toActivate.focus();
            }

            return false; // Prevent further close operations
        }

        // Proceed with the default close behavior for other tabs
        if (card && card.fireEvent('beforeclose', card) === false) {
            return false;
        }

        toActivate = me.findNextActivatable(toClose);

        Ext.suspendLayouts();

        if (toActivate) {
            if (tabPanel) {
                tabPanel.setActiveTab(toActivate.card);
            } else {
                me.setActiveTab(toActivate);
            }

            toActivate.focus();
        }

        if (tabPanel && card) {
            delete toClose.ownerCt;

            card.fireEvent('close', card);
            tabPanel.remove(card);

            if (card.ownerCt !== tabPanel) {
                toClose.fireClose();
                me.remove(toClose);
            } else {
                toClose.ownerCt = me;
                Ext.resumeLayouts(true);
                return false;
            }
        }

        Ext.resumeLayouts(true);
    }
});
