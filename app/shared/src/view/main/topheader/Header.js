Ext.define('MyApp.view.main.topheader.Header', {
    extend: 'Ext.toolbar.Toolbar',

    requires:['Ext.Img'],
    
    xtype: 'top-header',
    style: 'background:white;',
    defaults: {
        width: 200,
        height:80
    },

    items: [
       {
        xtype: 'image',
        src: './resources/desktop/ee_company.png'
        
       }, '->',{
        xtype: 'image',
        src: './resources/desktop/ABC_company.png',
        width: 350
       }
    ]
});
