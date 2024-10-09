Ext.define("MyApp.util.Util", {
    alternateClassName: ["UTIL"],
    singleton: true,
    defaultView: "employee-search",

    popupwindows: {},
    log: function (msg) {
        console.log(msg);
    },

    mask: function (hide, msg) {
        Ext.getBody()[hide ? "unmask" : "mask"](msg || "Please wait...");
    },

    logout: function () {
        SessionUtil.clearAll();
        // TODO: revisit routing
        location.hash = "login";
    },


    showWarning: function (config, callback) {
        Ext.Msg.alert(config.title, config.message, function () {
            if (callback && typeof callback === 'function') {
                callback();  // Call the callback after the alert is dismissed
            }
        }, this);
    },

    transformObject: function (obj, map, type) {
        var output = {},
            key,
            mapKey;

        for (key in obj) {
            mapKey = map[key];

            if (mapKey) {
                output[mapKey] = mapKey === "allowBlank" ? !obj[key] : obj[key];
            } else {
                output[key] = obj[key];
            }
        }

        if (type) {
            output.xtype = type;
        }

        return output;
    },

    prepareStore: function (api, infiniteGrid) {
        var apiConfig = api,
            apiUrl,
            apiMethod,
            autoLoad = api.autoload,
            bufferedRenderer = api.bufferedRenderer,
            buffered = !!infiniteGrid,
            pageSize = api.pageSize || 25,
            leadingBufferZone = api.leadingBufferZone || 50,
            trailingBufferZone = api.trailingBufferZone || 50,
            urlObj = {
                create: undefined,
                read: undefined,
                update: undefined,
                destroy: undefined,
            }, returnObj;

        if (typeof apiConfig === "string") {
            apiUrl = apiConfig;
            apiMethod = "GET";
        } else {
            apiUrl = apiConfig.read || apiConfig.post || apiConfig.put || apiConfig.delete;

            if (apiConfig.read) {
                urlObj.read = URLS.url[apiConfig.read];
                apiMethod = 'GET';
            } else if (apiConfig.post) {
                urlObj.create = URLS.url[apiConfig.post];
                apiMethod = 'POST';
            } else if (apiConfig.put) {
                urlObj.update = URLS.url[apiConfig.put];
                apiMethod = 'PUT';
            } else if (apiConfig.delete) {
                urlObj.destroy = URLS.url[apiConfig.delete];
                apiMethod = 'DELETE';
            }
        }


        returnObj = {
            proxy: {
                type: "rest",
                url: URLS.url[apiUrl],
                api: urlObj,
                reader: {
                    type: "json"
                },
                writer: {
                    type: "json",
                },
                actionMethods: {
                    read: apiMethod,
                    create: "POST",
                    update: "PUT",
                    destroy: "DELETE",
                },
                paramsAsJson: true,
            },
            autoLoad: autoLoad, // Temporarily set to false
            bufferedRenderer: bufferedRenderer,
            buffered: buffered,
            pageSize: pageSize,
            leadingBufferZone: leadingBufferZone,
            trailingBufferZone: trailingBufferZone
        }

        if (infiniteGrid) {
            returnObj.proxy.reader.rootProperty = 'data';
            returnObj.proxy.reader.totalProperty = 'total';
        }

        return returnObj;
    },

    checkEmptyFields: function (obj) {
        Object.keys(obj).forEach(function (key) {
            if (obj[key] === "") {
                obj[key] = null;
            }
        });
        return obj;
    }
});
