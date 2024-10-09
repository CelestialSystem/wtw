Ext.define('MyApp.view.main.employee.ServiceHistoryViewModel', {
	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.service-history-vm',

	stores: {
    serviceHistory: {
      proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'resources/desktop/servicehistory.json'
    },
    autoLoad: true,
    pageSize: 10
    }
	}
});
