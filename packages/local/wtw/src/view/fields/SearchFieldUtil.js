Ext.define('WTW.view.fields.SearchFieldUtil', {
  alternateClassName: 'SearchFieldUtil',
  singleton: true,
  configure: function (config) {
    var mapperConfig = {
      bindkey: 'bindkey',
      caption: 'fieldLabel',
      cls: 'cls',
      columnSpan: 'colspan',
      description: "tooltip",
      height: 'height',
      hidden: 'hidden',
      isRequired: 'allowBlank',
      labelSeparator: 'labelSeparator',
      labelWidth: 'labelWidth',
      margin: 'margin',
      readOnly: 'readOnly',
      style: 'style',
      title: 'title',
      trigger: 'trigger',
      view: 'view',
      width: 'width'
    };

    config.margin = "60 0 10 120";
    config.labelSeparator = ''
    config = UTIL.transformObject(config, mapperConfig, 'wtw-searchfield');

    config.listeners = {
      render: function (cmp) {
        cmp.getEl().on('click', function () {
          alert('Icon clicked!');
        });
      }
    }

    return config;
  }
});