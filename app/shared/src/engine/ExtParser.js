Ext.define('WTW.util.ParserEngine', {
  singleton: true,

  alternateClassName: 'ParserEngine',

  // TODO - Check this because it is not being replaced for docked items
  replacer: {
    type: 'xtype',
    elements: 'items'
  },

  storeMap: new Map(), // Map to store created stores

  /**
   * Entry point for parsing the data metadata
   * @param {Object} data | Metadata fetched from the backend
   * @returns {Object} Returns the Extjs config for the metadata passed
   */
  parseData: function (data) {
    var parsedObject = {};

    data = this.applyReplacer(data);

    this.parseElement(data, parsedObject);

    return parsedObject;
  },

  applyReplacer: function (obj) {
    var newKey, value;

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        obj[index] = this.applyReplacer(item);
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (let key in obj) {
        newKey = this.replacer[key] || key;
        value = obj[key];

        if (typeof value === 'string' && value.startsWith('function')) {
          value = eval('(' + value + ')');
        } else {
          value = this.applyReplacer(value);
        }

        obj[newKey] = value;
      }
    }

    return obj;
  },

  /**
   * Parses the metadata recursively to convert to Extjs Understandable config
   * @param {Object} data | Metadata fetched from the backend
   * @param {Object|Array} viewConfig | Its a placeholder to store the parsed information
   */
  parseElement: function (data, viewConfig, index) {
    var me = this,
      type = TypeMapper.getType(data.type),
      transformedObject = me.transformObject(data, TypeMapper.configMapper, type),
      configObj,
      childKey,
      storecfg = data.storecfg;

    Ext.isArray(viewConfig)
      ? (Ext.isNumber(index) ? viewConfig[index] = transformedObject: viewConfig.push(transformedObject))
      : Object.assign(viewConfig, transformedObject);

    configObj = viewConfig.xtype ? viewConfig : transformedObject;

    if (data.elements && Ext.isArray(data.elements)) {
      childKey = TypeMapper.childKey[configObj.xtype] || 'items';
      configObj[childKey] = [];

      data.elements.forEach((element) => {
        me.parseElement(element, configObj[childKey]);
      });

      delete configObj.elements;
    }

    // TODO: Check for defaults/fieldDefaults or if any of the type is not defined
    if(configObj.defaults) {
      me.transformObject(configObj.defaults, TypeMapper.configMapper, TypeMapper.getType(configObj.defaults.type))
    }

    if(configObj.showRowNumber && Ext.isArray(configObj.columns)){
      configObj.columns.unshift({
        "type": "rownumberer"
      })
    }
    if(configObj.columns) {
      me.transformObject(configObj.columns, TypeMapper.configMapper, TypeMapper.getType(configObj.columns.type))
      if(Ext.isArray(configObj.columns))
      configObj.columns.forEach((element,i) => {
        me.parseElement(element, configObj.columns, i);
      });
    }

   if(configObj.bbar) {
      me.transformObject(configObj.bbar, TypeMapper.configMapper, TypeMapper.getType(configObj.bbar.type))
      if(Ext.isArray(configObj.bbar))
      configObj.bbar.forEach((element,i) => {
        me.parseElement(element, configObj.bbar, i);
      });
    }
 
    if(configObj.tbar) {
      me.transformObject(configObj.tbar, TypeMapper.configMapper, TypeMapper.getType(configObj.tbar.type) || 'button')
      
      if(Ext.isArray(configObj.tbar))
      configObj.tbar.forEach((element, i) => {
        me.parseElement(element, configObj.tbar, i);
      });
    }

    me.addStore(storecfg, viewConfig);
    me.parseActions(data, configObj);
  },

  parseActions: function (data, configObj) {
    var me = this;

    if (data.action) {
      configObj.handler = function(cmp) {
        var action = data.action;
        me.handleAction(action,cmp);
      };
    }

    if (data.postAction) {
      configObj.postAction = data.postAction
    }
  },

  /**
 * Handle the action specified in the metadata
 * @param {Object} action | Action configuration
 */
  handleAction: function (action, cmp) {
    // Implement the logic to handle the action
    // Example: Load a new view and send new data
    var viewName = action.view,
      viewData = action.data;

      Ext.fireEvent(action, cmp, cmp.postAction ? function(postAction){
      Ext.fireEvent(postAction.action, postAction)
        }: '');
    // Load the new view with the specified data
    // Implement the logic to load the view and pass the data
  },

  /**
   * Handle the postAction specified in the metadata
   * @param {Object} postAction | PostAction configuration
   */
  handlePostAction: function (postAction) {
    // Implement the logic to handle the postAction
    // Example: Perform an action after the click event
    var actionName = postAction.name,
      actionParams = postAction.params;

    // Perform the postAction based on the actionName and actionParams
    // Implement the logic to execute the postAction
  },

  /**
   * This function transforms the input object based on the provided mapping,
   * It creates a new object with the mapped keys and values
   * @param {Object} obj | Component for which we need to replace the mapped keys eg. label -> fieldLabel
   * @param {Object} map | Config Mapper Object
   * @param {String} type | xtype of the Component
   * @returns transformed Component config object
   */
  transformObject: function (obj, map, type) {
    var output = {},
      key, mapKey;

    for (key in obj) {
      mapKey = map[type] && map[type][key];

      if (mapKey) {
        output[mapKey] = obj[key];
      } else {
        output[key] = obj[key];
      }
    }

    if (type) {
      output.xtype = type;
    }

    return output;
  },

  createStore: function (storeConfig) {
    return Ext.create('Ext.data.Store', storeConfig);
  },

  /**
   * For storecfg as an object with 'remoteStore' store, 
   * it checks if the store has already been created using storeMap. 
   * If not, it creates the store using me.createStore(storecfg.remoteStore) 
   * and stores it in storeMap.
   */
  addStore: function (storeConfig, config) {
    var me = this,
      key, singleStoreConfig, storeName, store;

    if (storeConfig && Ext.isObject(storeConfig)) {
      for (key in storeConfig) {
        if (storeConfig.hasOwnProperty(key)) {
          singleStoreConfig = storeConfig[key];
          storeName;

          if (Ext.isObject(singleStoreConfig.name)) {
            // Assume singleStoreConfig.name has 'id' and 'type' properties
            storeName = `${singleStoreConfig.name.id}_${singleStoreConfig.name.type}`;
          } else {
            storeName = singleStoreConfig.name;
          }

          if (!me.storeMap.has(storeName)) {
            store = me.createStore(singleStoreConfig);
            me.storeMap.set(storeName, store);
          }

          config.store = me.storeMap.get(storeName);
        }
      }
    }
  },


  parseListeners: function () {
    // Attach listeners with any component
    // Ex- Button handler
    // Input Change
  },

  parseBinding: function () {
    // Add component bindings
  },

  parseLayout: function () {
    // parse the component holder layouts
  }
});
