Ext.define('WTW.view.fields.TbFillUtil', {
    alternateClassName: 'TbFillUtil',
    singleton: true,
    configure: function(config) {
        var mapperConfig = {
            width: "width"
        }
          return UTIL.transformObject(config, mapperConfig, 'wtw-tbfill')
    }
});