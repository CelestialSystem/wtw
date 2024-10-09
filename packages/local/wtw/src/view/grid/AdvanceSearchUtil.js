Ext.define('WTW.view.grid.AdvanceSearchUtil', {
    alternateClassName: 'AdvanceSearchUtil',
    singleton: true,
    configure: function(config) {
        var mapperConfig = {
            height: 'height',
            name: 'reference',
            tableStore: 'tableStore', 
            width: 'width'
          };

          return UTIL.transformObject(config, mapperConfig, 'wtw-advance-search')
    }
});