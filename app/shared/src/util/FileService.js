Ext.define('WTW.util.FileService', {
    singleton: true,
    alternateClassName: 'FILESERVICE',

    getFile: function (url, fileName, success, failure, scope) {
        DATA.get(url, { fileName: fileName }, success, failure, scope);
    },

    uploadFile: function (url, fileName, fileData, success, failure, scope) {
        var formData = new FormData();
        formData.append('fileName', fileName);
        formData.append('file', fileData);

        var jsonData = {};
        formData.forEach((value, key) => jsonData[key] = value);

        DATA.post(url, jsonData, success, failure, scope);
    },

    listFile: function (url, success, failure, scope) {
        DATA.get(url, {}, success, failure, scope);
    }
});