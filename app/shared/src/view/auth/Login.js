Ext.define('MyApp.view.auth.Login', {
    extend: 'Ext.Container',
    requires: ['Ext.layout.container.Center'],
    xtype: 'login',

    controller: 'login',

    cls: 'login-page',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    height: Ext.getBody().getHeight(),

    items: [{
        xtype: 'container',
        flex: 0.6,
        cls: 'left-cont',
        layout: 'center',
        items: [{
            xtype: 'component',
            cls: 'center-text',
            html: [
                '<p class="welcome-message">Welcome</p>',
                '<p class="sub-text">You can sign in to access it with your existing profile.</p>'
            ].join('')
        }]
    }, {
        xtype: 'container',
        minWidth: 320,
        flex: 0.4,
        cls: 'login-form',
        layout: 'center',
        items: [{
            xtype: 'form',
            cls: 'form-cls-light',
            reference: 'form',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            defaults: {
                margin: '0 0 20 0'
            },
            border: false,
            items: [{
                src: "./resources/desktop/loginlogo.png",
                xtype: "image",
                width: 200,
                height: 60,
                margin: '0 auto 20 auto'
            }, {
                xtype: 'component',
                html: '<h1>Sign In</h1>',
                width: 300
            }, {
                xtype: 'textfield',
                labelWidth: 90,
                cls: 'login',
                reference: 'username',
                name: 'username',
                fieldLabel: 'User Name',
                allowBlank: false
            }, {
                xtype: 'textfield',
                labelWidth: 90,
                cls: 'login',
                fieldLabel: 'Password',
                inputType: 'password',
                reference: 'password',
                name: 'password',
                allowBlank: false
            }, {
                xtype: 'checkbox',
                name: 'rememberme',
                reference: 'rememberme',
                boxLabel: 'Remember Me',
            }, {
                xtype: 'button',
                text: 'Login',
                margin: '0 0 0 140',
                handler: 'onLogin',
                dataAttribute: {
                    'data-testid': 'loginBtn'
                },
                formBind: true,
                height: 30,
                width: 60,
                cls: 'login-btn'
            }]
        }]
    }]
});
