Ext.define('MyApp.view.nav.menu.MenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menuviewcontroller',

    onLeftMenuSelectionChange: function (tree, info) {
        var node = info.node,
        action = node.data.action;

        if (action == null) { return }
        // ROUTING.redirectTo(action, this);
        this.redirectTo(`view/` + action);
        this.view.up('employee-search').getController().updateCenterViewXtype(node);
    },

    onLeftMenuPainted: function (treelistEl) {
        var treelist = treelistEl.component;
        treelist.setSelection(treelist.getStore().getRoot().firstChild);
    }
});
