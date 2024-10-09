Ext.define('WTW.view.tab.TabGroupUtil', {
  alternateClassName: 'TabGroupUtil',

  singleton: true,

  configure: function (config) {
    var mapperConfig = {
      caption: 'title',
      children: 'items',
      closable: 'closable',
      columnName: 'recordId',
      description: "tooltip",
      height: 'height',
      isPrimaryKeyMember: 'isPrimaryKeyMember',
      isRequired: 'allowBlank',
      maxLength: 'maxLength',
      name: "reference",
      store: 'store',
      tabBarGroup: "tabBar",
      view: 'view',
      width: 'width'
    };
    config = UTIL.transformObject(config, mapperConfig, 'wtw-tabpanel');

    if (config.store && config.api) {
      config.viewModel = { stores: {} };
      config.viewModel.stores[config.store] = UTIL.prepareStore(config.api);
    }

    if (config.tabBar) {
      ButtonUtil.createButton(config)
    }

    config.scrollable = true;

    return config;
  }
});
