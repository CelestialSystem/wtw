Ext.define('MyApp.view.main.employee.EarningsHoursHistoryViewModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.earnings-hours-history-vm',

  stores: {
    earningsHoursHistory: {
      proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'resources/desktop/earningshourshistory.json'
      },
      autoLoad: true,
      pageSize: 10
    }
  }
});
