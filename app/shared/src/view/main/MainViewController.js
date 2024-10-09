Ext.define("MyApp.view.main.MainViewController", {
  extend: "Ext.app.ViewController",
  alias: "controller.mainviewcontroller",

  config: {
    centerViewXtype: null,
  },

  listen: {
    global: {
      onSearchClick: "handleSearchClick",
      onSaveClick: "handleSaveClick",
      onLoad: "handleLoad",
      loadView: "loadView"
    },
  },

  onMainViewRender: function () {
    var me = this;

    DATA.get(URLS.url.getnavigationtreehash, {}, function (data) {
      me.loadMenuNavigationTree(data.hashValue)
    }, null, me);

  },

  loadMenuNavigationTree: function (beHash) {
    var me = this;

    INDEXED_DB.getItem('navigationTreeData', function (cachedData) {

      var store = me.getStore("menu"),
        parsedData = typeof(cachedData) === 'string' ? JSON.parse(cachedData) : cachedData;

      // Load data from localStorage
      store.setRootNode(parsedData);
      var nodeName = location.hash.replace('#view/', ''),
        node, hash;

        hash = INDEXED_DB.hash(cachedData);

      if (beHash !== hash) {
        me.getViewModel().get('menu').load();
        return;
      }


      node = store.findNode('action', nodeName) || store.getRoot().firstChild;

      me.updateCenterViewXtype(node);
    }, function () {
      me.getViewModel().get('menu').load();
    });
  },

  handleSearchClick: function (cmp, postActionCallback) {
    var me = this;

    MyApp.util.AjaxUtil.sendRequest(
      {
        url: "resources/desktop/results.json",
        method: "GET",
      },
      function (response, opts) {
        if (postActionCallback) {
          postActionCallback(cmp.postAction);
        }
      },
      function (response, opts) { }
    );
  },

  loadView: function (postAction) {
    var me = this;
    MetadataFetcher.loadView(postAction.viewName, function (data) {
      var tabpanel = me.lookup("search-panel"),
        newTab = data,
        tab;

      tab = tabpanel.add(newTab);
      tabpanel.setActiveTab(tab);
    });
  },

  handleSaveClick: function (eventData) {
    // Handle the save click event
    console.log("Save clicked!", eventData);
  },

  handleLoad: function (eventData) {
    // Handle the load event
    console.log("Loaded!", eventData);
  },

  onLoaded: function (datstore, records, successful, operation, eOpts) {
    var me = this;
    INDEXED_DB.setItem('navigationTreeData', JSON.stringify(operation._request._rawRequest.xhr.response), function () {
      UTIL.mask(1);
      var store = me.getStore("menu"),
        nodeName = location.hash.replace('#view/', ''),
        node;

      node = store.findNode('action', nodeName) || store.getRoot().firstChild;

      me.updateCenterViewXtype(node);
    });
  },

  onBeforeExpand: function (node, options) {
    node.data.children = node.data.elements
    delete node.data.elements
  },

  onBeforeLoad: function (store) {
    // Set headers for AJAX request
    store.getProxy().setHeaders({
      'Authorization': 'Bearer ' + SessionUtil.get('accessToken')
    });
    UTIL.mask();
  },

  updateCenterViewXtype: function (menuItem) {
    var me = this,
      data, centerview, vm;

    if (!menuItem) {
      return;
    }

    data = menuItem.data;
    centerview = me.getView().down("centerview");

    centerview.removeAll();
    // Fetch the metadata -> parse -> add to the center container
    MetadataFetcher.loadView(menuItem.get("action"), function (data) {
      if (data.window) {
        me.renderWindow(data);
      } else {
        var child = centerview.add(data);

        centerview.setActiveItem(child);
      }


      UTIL.mask(1);
    });

    vm = me.getViewModel();

    vm.set("menuItem", menuItem);
    vm.set("heading", data.title || data.text);
  },

  renderWindow: function (data) {
    var me = this,
      windowCfg = {
        xtype: 'window',
        title: data.title,
        autoShow: true,
        modal: true,
        height: 500,
        width: 500,
        layout: 'fit',
        items: data,
        scope: me,
        listeners: {
          show: function () {
            var vm = me.getViewModel();
            if (data.attributeName == 'addnewpersonWindow') {
              vm.set('currentStep', 0);
            }
          }
        }
      };

    Ext.create(windowCfg);
  },

  onMenuViewSelectionChange: function (tree, node) {
    if (node == null) {
      return;
    }

    if (!Ext.isEmpty(node.get("xtype"))) {
      this.redirectTo(node.get("xtype"));
    }
  },

  onLogout: function () {
    UTIL.logout();
  },

  changeTheme: function (menu, btn) {
    SessionUtil.set('theme', btn.name);

    window.location.reload();
  }
});
