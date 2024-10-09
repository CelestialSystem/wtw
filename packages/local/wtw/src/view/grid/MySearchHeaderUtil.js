Ext.define('WTW.view.grid.MySearchHeaderUtil', {
    alternateClassName: 'MySearchHeaderUtil',
    singleton: true,
    configure: function(config) {
        var mapperConfig = {
            name: 'reference',
            height: 'height',
            width: 'width'
          };

          return UTIL.transformObject(config, mapperConfig, 'wtw-mysearch-header')
    }
});