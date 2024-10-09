Ext.define('WTW.view.form.Form', {
    extend: 'Ext.form.Panel',

    xtype: 'wtw-formpanel',
    cls: 'form-cls',

    initComponent: function () {
        this.on('beforeadd', function (me, field) {
            if (!field.allowBlank)
                field.labelSeparator += '<span style="color: rgb(255, 0, 0); padding-left: 2px;">*</span>';
        });
        this.callParent(arguments);
    },

    loadFormData: function (params, writeOnlyFields) {
        var me = this,
            api = me.apiMetadata, fields;

        if (me.model) {
            me.model.destroy();
            me.model = null;
        }

        fields = this.createModelFields()
        me.model = Ext.create(Ext.define(me.id + Ext.id(), {
            extend: 'Ext.data.Model',
            proxy: Ext.applyIf({
                // 'writeOnlyFields' set to true to get delta fields while updation
                writer: {
                    writeAllFields: writeOnlyFields
                }
            }, DynamicFormModelUtil.proxy),
            fields: fields
        }));
        this.setApiEndpoints(me.model, api);
        UTIL.mask();
        me.model.load({
            params: params,
            callback: function (record) {
                me.loadRecord(record);
                UTIL.mask(1);
            }
        });
    },

    updateFormData: function (params) {
        if (!this.getForm().isValid()) {
            UTIL.showWarning({ title: "Alert", message: 'Please fill all the required fields.' });
            return;
        }

        var me = this,
            record = this.getRecord(),
            modifiedvalue = this.getForm().getFieldValues(true);
        UTIL.mask();

        record.set(modifiedvalue);
        record.data = UTIL.checkEmptyFields(record.data);
        record.save({
            params: params,
            success: function (rec, operation) {
                UTIL.mask(1);
                me.loadRecord(record);
                UTIL.showWarning({ title: "Success", message: 'Form data saved successfully.' });
            },
            failure: function (rec, operation) {
                UTIL.mask(1);
                UTIL.showWarning({ title: "Failure", message: 'Failed to save form data.' });
                record.reject(); // Revert changes
                me.loadRecord(record); // Update form with reverted data
            }
        });
    },

    setApiEndpoints(model, apiMetadata, query) {
        var me = this;

        if (me.updateDataKey) {
            urlObj[me.updateDataKey] = query[me.updateDataKey];
        }

        model.getProxy().setApi({
            read: URLS.url[this.api.read],
            update: URLS.url[this.api.put]
        });
    },


    createModelFields: function () {
        var me = this,
            fields = [];

        me.form.getFields().items.forEach(c => {
            var temp = {
                name: c.name,
                type: 'string'
            }

            if (c.xtype === 'wtw-datefield') {
                temp.type = 'date'
                temp.dateFormat = 'Y-m-d'
            }

            fields.push(temp);
        });

        return fields;
    }
});
