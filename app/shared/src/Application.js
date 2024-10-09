Ext.define("MyApp.Application", {
  extend: "Ext.app.Application",
  name: "MyApp",
  requires: ["MyApp.*", "WTW.*", "Ext.*"], //TODO-Change App Namespace to WTW
  defaultToken: "login",
  routes: {
	login: 'onLogin',
	home: 'onHome',
    "view/:{id}": {
      action: "onView",
    },
  },

  onView: function (value) {
    var me = this,
    	id = value.id;

  if(value && value.id === "login"){
    return;
  }

	if(!this.activeView){
		this.activeView = Ext.create({xtype: 'employee-search', plugins: 'viewport'});
	}
	
    this.redirectTo(`view/` + id);
  },

  onLogin: function(){
	Ext.destroy(this.activeView);
	this.activeView  = Ext.create({ xtype: "login", plugins: "viewport" });
  },

  onHome: function(){
	Ext.destroy(this.activeView);
	this.activeView  = Ext.create({ xtype: "employee-search", plugins: "viewport" });
  },

  launch: function () {
    Ext.ariaWarn = Ext.emptyFn;
    Ext.getBody().removeCls("launching");
    var elem = document.getElementById("splash");
    elem.parentNode.removeChild(elem);

    document.title = "EE-Point Demo App";

    isLoggedIn = SessionUtil.isLoggedIn();

    if (!isLoggedIn) {
      UTIL.logout();
      return;
    }
    INDEXED_DB.updateBackendHash();
    
    Ext.Ajax.setDefaultHeaders({
      'Authorization': 'Bearer ' + SessionUtil.get('accessToken')
  });

  },

  onAppUpdate: function () {
    Ext.Msg.confirm(
      "Application Update",
      "This application has an update, reload?",
      function (choice) {
        if (choice === "yes") {
          window.location.reload();
        }
      }
    );
  },
});
