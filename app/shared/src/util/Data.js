Ext.define('MyApp.util.Data', {
    alternateClassName: ['DATA'],
    singleton: true,

    getHeaders: function (params) {
        var paramHeader = params && params.headers,
            headers = {
                Authorization: "Bearer " + localStorage.getItem('accessToken')
            };

        if (params) {
            delete params.headers
        }

        return Ext.apply(headers, paramHeader)
    },

    get: function (url, params, success, failure, scope) {
        return Ext.Ajax.request({
            url: url,
            method: 'GET',
            params: params,
            headers: this.getHeaders(params),
            success: function (res) {
                var data = Ext.decode(res.responseText);

                if (Ext.isFunction(success) && scope) {
                    success.call(scope, data);
                }
            },

            failure: function (err) {
                if (Ext.isFunction(failure) && scope) {
                    failure.call(scope, err);
                }

            }
        });
    },

    post: function (url, jsonData, success, failure, scope) {
        return Ext.Ajax.request({
            url: url,
            jsonData: jsonData,
            method: 'POST',
            headers: this.getHeaders(jsonData),
            success: function (res, opts) {
                var data = Ext.decode(res.responseText);

                if (Ext.isFunction(success) && scope) {
                    success.call(scope, data, opts);
                }
            },

            failure: function (err) {
                if (Ext.isFunction(failure) && scope) {
                    failure.call(scope, err);
                }
            }
        });
    },

    delete: function (url, params, success, failure, scope) {
        return Ext.Ajax.request({
            // url: url,
            url: Ext.urlAppend(url, Ext.Object.toQueryString(params)),  // Append params to URL
            params: params,
            method: 'DELETE',
            headers: this.getHeaders(params),
            success: function (response) {
                UTIL.showWarning({ title: "Success", message: 'Record delete successfully!' });
                if (Ext.isFunction(success) && scope) {
                    success.call(scope);
                }
            },
            failure: function (response) {
                UTIL.showWarning({ title: "Failure", message: 'Failed to delete record.' });
            }
        });
    },

    put: function (url, jsonData, success, failure, scope) {
        return Ext.Ajax.request({
            url: url,
            jsonData: jsonData,
            method: 'PUT',
            headers: this.getHeaders(jsonData),
            success: function (response) {
                UTIL.showWarning({ title: "Success", message: 'Person updated successfully!' });
            },
            failure: function (response) {
                UTIL.showWarning({ title: "Failure", message: 'Failed to update person.' });
            }
        });
    }
}, function () {
    Ext.Ajax.on('requestexception', function (conn, response) {
        if (response.status === 401) {
            UTIL.showWarning({ title: "Error", message: 'You have been logged out due to <b>inactivity</b>. Please log in again to continue.' },
                function () {
                    UTIL.logout();
                });
        }
    })
});
