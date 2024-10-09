Ext.define("MyApp.view.auth.LoginController", {
  extend: "Ext.app.ViewController",
  alias: "controller.login",

  init: function () {
    this.loadCredentials();
  },

  onLogin: function (btn, action) {
    var me = this,
      username = me.lookup("username").getValue(),
      password = me.lookup("password").getValue(),
      saveCredential = me.lookup("rememberme").getValue();

    UTIL.mask();
    if (saveCredential) {
      this.saveCredentials(username, password, saveCredential).then(
        this.loginCall(username, password)
      );
    } else {
      localStorage.clear();
      this.loginCall(username, password);
    }
  },

  loginCall: function (username, password) {
    DATA.post(
      URLS.url.login,
      {
        email: username,
        password: password,
      },
      function (data, opts) {
        this.handleLoginSuccess(data);
        SessionUtil.set("usermail", opts.jsonData.email);
        UTIL.mask(1);
      },
      function (err) {
        UTIL.mask(1);
      },
      this
    );
  },

  saveCredentials: function (username, password, saveCredential) {
    return SessionUtil.encrypt(password, "secret_password").then(
      (encryptedPassword) => {
        SessionUtil.set("username", username);
        SessionUtil.set("password", JSON.stringify(encryptedPassword));
        SessionUtil.set("rememberme", saveCredential);
      }
    );
  },

  loadCredentials: function () {
    var username = SessionUtil.get("username"),
      encryptedPassword = SessionUtil.get("password"),
      saveCredential = SessionUtil.get("rememberme"),
      form;

    if (saveCredential) {
      return SessionUtil.decrypt(
        JSON.parse(encryptedPassword),
        "secret_password"
      ).then((decryptedPassword) => {
        form = Ext.ComponentQuery.query("form")[0].getForm();
        form.setValues({
          username: username,
          password: decryptedPassword,
          rememberme: saveCredential,
        });
      });
    }
  },

  handleLoginSuccess: function (data) {
    var key, me = this;

    for (key in data) {
      SessionUtil.set(key, data[key]);
    }

    Ext.Ajax.setDefaultHeaders({
      'Authorization': 'Bearer ' + SessionUtil.get('accessToken')
    });

    INDEXED_DB.updateBackendHash();

    this.redirectTo('home');
  },
});
