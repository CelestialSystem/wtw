Ext.define('WTW.view.panel.AdvanceSearchPanelUtil', {
    alternateClassName: 'AdvanceSearchPanelUtil',
    singleton: true,
    configure: function(config) {
        var mapperConfig = {
            width: 'width',
            height: 'height',
            name: 'reference'
          };

          return UTIL.transformObject(config, mapperConfig, 'wtw-advancesearch-panel')
    }
});