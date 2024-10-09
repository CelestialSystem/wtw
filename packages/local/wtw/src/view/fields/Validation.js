Ext.define('WTW.view.fields.Validation', {
    alternateClassName: 'Validators',
    singleton: true,

    evaluateValidator: function () {
        var obj = {
            lengthValidator: this.checkLength,
            regexValidator: this.checkRegex
        }

        return obj;
    },

    getValidators: function (element) {
        var validatorObj = {
            lengthValidator: {
                maxLength: element.maxLength,
                minLength: element.minLength,
                lengthError: element.message
            },
            regexValidator: {
                pattern: element.pattern,
                regexError: element.message
            }
        }

        return validatorObj;
    },

    checkLength: function (val, obj) {
        if (val) {
            return (obj.minLength < val.length && val.length <= obj.maxLength) ? true : obj.lengthError;
        }
        return true;
    },

    checkRegex: function (val, obj) {
        var regex;

        if (val) {
            // Check if the value matches the regex
            regex = new RegExp(obj.pattern);
            return regex.test(val) ? true : obj.regexError;
        }
        return true;
    },

    parseValidator: function (config) {
        var me = this,
            validate = config.validator,
            validatorArr = [], validatorObj = {}, err = true;

        if (validate.length) {
            validate.forEach((element) => {
                validatorObj = Object.assign({}, validatorObj, me.getValidators(element)[element.type]);
                validatorArr.push(me.evaluateValidator()[element.type]);
                config.validator = function (val) {
                    for (let i = 0; i < validatorArr.length; i++) {
                        err = validatorArr[i](val, validatorObj);
                        if (err != true) {
                            return err;
                        }
                    };
                    return err;
                }
            });
        }

        return config;
    }
});
