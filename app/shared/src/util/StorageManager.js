Ext.define('MyApp.util.StorageManager', {
    alternateClassName: ['INDEXED_DB'],
    singleton: true,
    
   dbName: 'wtw-Db',
   storeName: 'wtw-store',

   constructor: function() {
    this.openDatabase();
   },

   openDatabase: function() {
        var request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = function (event) {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, { keyPath: 'id' });
            }
        }.bind(this);

        request.onsuccess = function (event) {
            this.db = event.target.result;
        }.bind(this);

        request.onerror = function (event) {
            console.error('Error opening IndexedDB:', event.target.errorCode);
        };
    },

    setItem: function (key, value, successCallback, errorCallback) {
        var transaction = this.db.transaction([this.storeName], 'readwrite');
        var store = transaction.objectStore(this.storeName);
        var request = store.put({ id: key, value: value });

        request.onsuccess = function () {
            if (successCallback) successCallback();
        };

        request.onerror = function (event) {
            console.error('Error setting item:', event.target.errorCode);
            if (errorCallback) errorCallback(event.target.error);
        };
    },

    getItem: function (key, successCallback, errorCallback) {
        var transaction = this.db.transaction([this.storeName], 'readonly');
        var store = transaction.objectStore(this.storeName);
        var request = store.get(key);

        request.onsuccess = function (event) {
            if (successCallback) successCallback(event.target.result ? event.target.result.value : null);
        };

        request.onerror = function (event) {
            console.error('Error getting item:', event.target.errorCode);
            if (errorCallback) errorCallback(event.target.error);
        };
    },

    removeItem: function (key, successCallback, errorCallback) {
        var transaction = this.db.transaction([this.storeName], 'readwrite');
        var store = transaction.objectStore(this.storeName);
        var request = store.delete(key);

        request.onsuccess = function () {
            if (successCallback) successCallback();
        };

        request.onerror = function (event) {
            console.error('Error removing item:', event.target.errorCode);
            if (errorCallback) errorCallback(event.target.error);
        };
    },

    updateBackendHash: function(){
        DATA.get(URLS.url.getFileHashes, {}, function (response) {
            localStorage.setItem('hashData', JSON.stringify(response));
          }, function (err) {
            console.log(err)
          }, this);
    },
    
    hash: function (data) {
        return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
    },
});
