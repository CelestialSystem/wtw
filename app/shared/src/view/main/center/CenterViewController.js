Ext.define("MyApp.view.center.CenterViewController", {
    extend: "Ext.app.ViewController",
    alias: "controller.centerview",

    listen: {
        global: {
            onrecidclick: "onRecIdClick",
            onOriginationDateTimeClick: "onOriginationDateTimeClick"
        }
    },

    init: function () {
        this.callParent();

        const eventMap = {
            click: { fn: this.onBtnClick, delegate: 'button[action]' },
            activate: { fn: this.onComponentActivate, delegate: 'component[componentActivateAction]' },
            blur: { fn: this.onComponentEvent, delegate: 'component[triggerActionblur]' },
            disable: { fn: this.onComponentEvent, delegate: 'component[triggerActiondisable]' },
            change: { fn: this.onComponentEvent, delegate: 'component[triggerActionchange]' },
            hide: { fn: this.onComponentEvent, delegate: 'component[triggerActionhide]' },
            enable: { fn: this.onComponentEvent, delegate: 'component[triggerActionenable]' },
            show: { fn: this.onComponenAfterRender, delegate: 'component[triggerActionAfterRender]' },
            tabchange: { fn: this.onComponentTabChange, delegate: 'component[triggerActionTabChange]' }
        };

        Object.keys(eventMap).forEach(event => {
            const config = eventMap[event];
            this.getView().on(event, config.fn, this, { delegate: config.delegate });
        });
    },

    onBtnClick: function (btn) {
        var actionCallback = this[btn.action];

        if (actionCallback) {
            actionCallback.call(this, btn);
        }
        else {
            UTIL.log(btn.action + ' is not defined');
        }
    },

    onComponentActivate: function (cmp) {
        var actionCallback = this[cmp.componentActivateAction];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.componentActivateAction + ' is not defined');
        }
        return false;
    },

    onComponenAfterRender: function (cmp) {
        var actionCallback = this[cmp.triggerActionAfterRender];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerActionAfterRender + ' is not defined');
        }
        return false;
    },

    onComponentTabChange: function (cmp, newTab) {
        var actionCallback = this[cmp.triggerActionTabChange];

        if (actionCallback) {
            actionCallback.call(this, cmp, newTab);
        }
        else {
            UTIL.log(cmp.triggerActionTabChange + ' is not defined');
        }
        return false;
    },

    onComponentChange: function (cmp) {
        var actionCallback = this[cmp.triggerActionchange];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerAction + ' is not defined');
        }
        return false;
    },

    onComponentBlur: function (cmp) {
        var actionCallback = this[cmp.triggerActionblur];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerActionblur + ' is not defined');
        }
        return false;
    },

    onComponentHide: function (cmp) {
        var actionCallback = this[cmp.triggerActionhide];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerActionhide + ' is not defined');
        }
        return false;
    },

    onComponentShow: function (cmp) {
        var actionCallback = this[cmp.triggerActionshow];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerActionshow + ' is not defined');
        }
        return false;
    },

    onComponentDisable: function (cmp) {
        var actionCallback = this[cmp.triggerActiondisable];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerActiondisable + ' is not defined');
        }
        return false;
    },

    onComponentEnable: function (cmp) {
        var actionCallback = this[cmp.triggerActionenable];

        if (actionCallback) {
            actionCallback.call(this, cmp);
        }
        else {
            UTIL.log(cmp.triggerActionenable + ' is not defined');
        }
        return false;
    },

    loadGridStoreData: function (grid) {
        var store = grid.store;

        if (!store) {
            // To-do  issue : grid's data persistes an irregular tab change
            if (grid.xtype != 'wtw-grid' || grid.xtype != 'grid') {
                grid = grid.down('wtw-grid');
                if (grid) {
                    store = grid.store;
                } else {
                    grid = this.lookup(grid.tabFormKey);
                    store = grid.store;
                }
            }
        }

        if (grid.initialConfig.readDataKey) {
            store.getProxy().setExtraParams(UTIL.requestQuery);
        }
        store.load();
    },

    onComponentEvent: function (cmp) {
        TriggerUtil.applyTriggers(cmp, this);
    },

    getFieldValues: function (arr,) {
        var me = this,
            values = {},
            fieldCmp;

        arr.forEach(field => {
            fieldCmp = me.getFieldComponent(field, me.getView());
            if (fieldCmp) {
                if (!Ext.isEmpty(fieldCmp.getValue())) {
                    values[field] = fieldCmp.getValue();
                }

                if (Ext.isDate(values[field])) {
                    values[field] = Ext.Date.format(values[field], 'Y-m-d');
                }

                if (Ext.isArray(values[field])) {
                    values[field] = values[field][0];
                }
            }
        });

        return values;
    },

    getFieldComponent: function (field, view) {
        var queryByReference = `[reference="${field}"]{isHierarchicallyHidden()===false}`;
        var queryBySearchKey = `[searchKey="${field}"]{isHierarchicallyHidden()===false}`;

        // Try finding the component by reference first
        var fieldCmp = Ext.ComponentQuery.query(queryByReference, view)[0];

        // If not found, try finding the component by searchKey
        if (!fieldCmp && !!field) {
            fieldCmp = Ext.ComponentQuery.query(queryBySearchKey, view)[0];
        }

        return fieldCmp;
    },

    onSearch: function (btn, result, showSave) {
        var me = this,
            targetGrid = me.lookup(btn.targetGrid),
            targetGridTab = me.lookup(btn.targetGrid + 'tab'),
            toolbar = targetGrid.getDockedItems()[0],
            arrFields;

        arrFields = btn.searchParams && btn.searchParams.split(',');
        result = result.query ? result : me.getFieldValues(arrFields);
        var bufferedStore = UTIL.prepareStore(btn.targetApi, true);

        targetGrid.setStore(bufferedStore);
        targetGrid.store.getProxy().setExtraParams(result);
        targetGrid.store.load();

        toolbar.down('#saveSearchCriteria') && toolbar.remove(toolbar.down('#saveSearchCriteria'));

        if (showSave) {
            toolbar.insert(3, {
                xtype: 'button',
                text: 'Save Search Criteria',
                iconCls: 'x-fas fa-save',
                itemId: 'saveSearchCriteria',
                handler: function () {
                    Ext.create('WTW.view.window.SavedSearch', { queryParam: result });
                }
            });
        }

        targetGrid.setHidden(false);
        targetGridTab.setHidden(false);
    },

    onUpdate: function (btn, action) {
        var detailForm = this.lookup(btn.targetGrid).getForm();
        var items = detailForm.getFields().items;
        var formData = {};

        Ext.Array.each(items, function (item) {
            formData[item.attributeName] = item.rawValue || '';
        });

        DATA.put(URLS.url.updateperson, formData);
    },

    renderwindow: function (btn) {
        var popup = UTIL.popupwindows[btn.renderScreen],
            windowCfg = {
                xtype: 'window',
                title: btn.text,
                autoShow: true,
                modal: true,
                height: 500,
                width: 600,
                layout: 'fit',
                items: [popup]
            };

        Ext.create(windowCfg);
    },

    //TODO Need to update to make more generic
    onRecIdClick: function (value, targetCmp, dataKey, title, parentCmp, viewToLoad) {
        var me = this;

        MetadataFetcher.loadView(viewToLoad, function (data) {
            var tabpanel = me.lookup("employeeSearchTab"),
                newTab = data,
                tab,
                requestQuery = {},
                tabExists = false,
                matchingTab = null;

            tabpanel.items.each(function (tab) {
                if (tab.targetId === value) {
                    matchingTab = tab;
                    tabExists = true;
                    return false;
                }
            });

            if (!tabExists) {
                newTab.itemId = 'tab-' + value;
                tab = tabpanel.add(newTab);
                tab.setTitle(title);
                tab.targetId = value;
                tabpanel.setActiveTab(tab);
                requestQuery[dataKey] = value;
                UTIL.requestQuery = requestQuery;
                me.getFieldComponent(targetCmp).loadFormData(requestQuery);
            } else {
                tabpanel.setActiveTab(matchingTab);
                UTIL.mask(1);
            }
        });
    },

    onOriginationDateTimeClick: function (value, targetCmp, dataKey, title, parentCmp) {
        var me = this,
            cmp = me.lookup(targetCmp),
            pcmp = me.lookup(parentCmp),
            requestQuery = {};

        requestQuery[dataKey] = value;
        UTIL.requestQuery = requestQuery;

        pcmp.getLayout().setActiveItem(cmp);
        me.ensureTargetVisiblity(cmp);
        pcmp.setTitle(title);
    },

    onAfterRender: function (cmp) {
        var attributeName = cmp.tabFormKey,
            writeOnlyFields = cmp.writeOnlyFields,
            form = cmp.down(`[attributeName=${attributeName}]`);

        form.loadFormData(UTIL.requestQuery, writeOnlyFields);
    },

    loadFormData: function (cmp) {
        var writeOnlyFields = cmp.writeOnlyFields;

        cmp.loadFormData(UTIL.requestQuery, writeOnlyFields);
    },

    updateFormData: function (cmp) {
        var detailForm = this.getFieldComponent(cmp.targetGrid);
        detailForm.updateFormData(UTIL.requestQuery);
    },

    ensureTargetVisiblity: function (childComponent) {
        var me = this,
            component = childComponent;
        var componentsToShow = [];

        // Traverse up the hierarchy and collect hidden components
        while (component) {
            if (!component.isVisible()) {
                componentsToShow.unshift(component);
            }
            component = component.up();
        }

        // Show all hidden components from top to bottom
        componentsToShow.forEach(function (comp) {
            comp.show();
            cmpTab = me.lookup(comp.reference + 'tab');
            if (cmpTab) {
                cmpTab.setHidden(false);
            }
        });

        // Ensure the child component is visible
        childComponent.show();
    },

    renderWorkSheetGrid: function (btn, action) {
        var { saveWork, parentId, selectedGrid, closable, title } = btn,
            view = this.getFieldComponent(parentId) || this.lookup(parentId),
            viewLayout = view.getLayout(),
            selectedGridView = selectedGrid ? this.getFieldComponent(selectedGrid) : null,
            columnsToClone = Ext.clone(selectedGridView.getColumns()),
            renderScreenView;

        var newColumns = Ext.Array.map(columnsToClone, function (column) {
            // Extract relevant config properties to avoid issues with direct cloning
            return {
                text: column.text,
                dataIndex: column.dataIndex,
                flex: column.flex,
                width: column.width,
                xtype: column.xtype,
                hidden: column.hidden
                // Add other properties as needed
            };
        });

        if (saveWork) {
            renderScreenView = Ext.create('WTW.view.grid.Grid', {
                tbar: [{
                    xtype: "button",
                    text: "Save WorkSheet",
                    iconCls: "x-fas fa-redo"
                }],
                closable: closable,
                title: title,
            });
            const gridToRender = renderScreenView;

            gridToRender.setColumns(newColumns);

            viewLayout.setActiveItem(gridToRender);

            gridToRender.setStore(Ext.create('Ext.data.Store', {
                data: selectedGridView.selModel.selected.items
            }));
        }
    },

    renderview: function (btn, action) {
        var me = this,
            parentId = btn.parentId,
            selectedGrid = btn.selectedGrid,
            renderScreen = btn.renderScreen,
            view = me.getFieldComponent(parentId) || me.lookup(parentId),
            selectedGridView, ownerCmp,
            viewLayout = view.getLayout(),
            items = view.initialConfig.items,
            arr = items.map(item => item.attributeName),
            tabPanel = me.view.down('tabpanel'),
            readDataKey = btn.readDataKey,
            deleteView = this.lookup(selectedGrid),
            menuCmp = btn.up('menu');

        selectedGridView = selectedGrid ? me.getFieldComponent(selectedGrid) : null;
        ownerCmp = menuCmp ? menuCmp.ownerCmp : undefined;
        if (selectedGridView) {
            if (this.checkMandatoryAndRequriredField([], {}, selectedGridView, readDataKey)) {
                return;
            }
        }

        if (btn.deleteKey) {
            const url = `${URLS.url.person}${selectedGridView.initialConfig.api.delete}`;

            DATA.delete(url, UTIL.requestQuery);
            selectedGridView.store.load();
            this.renderNewView(
                btn.deleteKey,
                selectedGrid,
                selectedGridView,
                renderScreen,
                deleteView,
                viewLayout,
                arr,
                view
            );

        } else {
            this.renderNewView(
                btn.deleteKey,
                selectedGrid,
                selectedGridView,
                renderScreen,
                deleteView,
                viewLayout,
                arr,
                view,
                ownerCmp);
        }

        if (btn.up('menu')) {
            tabPanel.setTitle('Employee' + ' > ' + btn.up('menu').ownerCmp.text + ' > ' + btn.text);
        }
    },

    renderNewView: function (deleteKey, selectedGrid, selectedGridView, renderScreen, deleteView, viewLayout, arr, view, ownerCmp) {
                if (ownerCmp) {
            ownerCmp.handler();
        }
        // Common logic for both delete and non-delete scenarios
        arr.forEach(item => {
            if (item === (deleteKey ? selectedGrid : renderScreen)) {
                var renderScreenView = this.getFieldComponent(renderScreen);

                if (!renderScreenView) {
                    renderScreenView = this.lookup(renderScreen)
                }

                const itemToRender = renderScreenView || deleteView;

                if (!itemToRender) {
                    return;
                }

                viewLayout.setActiveItem(itemToRender);

                if (itemToRender.getForm) {
                    itemToRender.getForm().reset();
                }
            }
        });
    },

    addNewRecord: function (btn, action) {
        var submittableForm = btn.up('form').reference === btn.submitForm,
            form = submittableForm ? btn.up('form') : btn.up('form').down('form[attributeName=' + btn.submitForm + ']'),
            result = form.getValues(),
            storeName = form.store,
            fields = form.getForm().getFields().items;

        // Validate form fields
        if (this.checkMandatoryAndRequriredField(fields, result)) {
            return;
        }

        var id = UTIL.requestQuery.id;

        // Proceed with the API call
        DATA.post(
            `${URLS.url.person}${storeName}?id=${id}`,
            result,
            function () {
                UTIL.mask(1);
                UTIL.showWarning({ title: "Success", message: 'Record created successfully.' });

            },
            function () {
                UTIL.mask(1);
                UTIL.showWarning({ title: "Failure", message: 'Record failed to create.' });
            },
            this
        );
    },

    /**
     * Checks for mandatory and required fields in the given result object.
     * If `selectedGridRecord` is passed, it ensures a record is selected and updates the query with the selected record's ID.
     * If any required field is not filled, it shows a warning message and returns true.
     * 
     * @param {Array} fields - An array of field configurations, where each field has properties like `name` and `isRequired`.
     * @param {Object} result - The result object that contains the values corresponding to the fields to be validated.
     * @param {Object} selectedGridRecord - The record object from the selected grid. The `selection` property holds the selected data.
     * @param {String} readDataKey - The key to store the selected record's ID in `UTIL.requestQuery`.
     * 
     * @returns {Boolean} - Returns `true` if any mandatory field is missing or no record is selected, otherwise returns `false`.
     */
    checkMandatoryAndRequriredField: function (fields, result, selectedGridRecord, readDataKey) {
        if (selectedGridRecord) {
            var { selModel, selection } = selectedGridRecord;

            if (selModel.selected.length > 1) {
                return UTIL.showWarning({ title: "Alert", message: "Update/Delete Only One Record at a time!!" }), true;
            }
            if (!selection) {
                return UTIL.showWarning({ title: "Alert", message: "Select Any One Record." }), true;
            }
            UTIL.requestQuery = { ...UTIL.requestQuery, [readDataKey]: selection.data.id };
        }

        return fields.some(field => {
            result[field.name] = result[field.name] || null;
            if (field.isRequired && result[field.name] === null) {
                return UTIL.showWarning({ title: "Alert", message: "Please fill mandatory fields" }), true;
            }
            return false;
        });
    },

    onTabChange: function (cmp, newTab) {
        // To-do Handling ID
        var requestQuery = {},
            title;

        requestQuery.id = cmp.targetId || newTab.targetId;
        UTIL.requestQuery = requestQuery;
        if (newTab.attributeName !== "detailPanel") {
            if (newTab.up('tabpanel') && newTab.up('tabpanel').attributeName === 'employeeDetailPanel') {
                title = 'Employee > ' + newTab.title;
            } else {
                title = 'Search : Employee';
            }
            this.lookup("employeeSearchTab").setTitle(title);
            if (newTab.attributeName === "employeeDetailPanel" && UTIL.requestQuery) {
                UTIL.requestQuery.id = newTab.targetId;
            }
        }
    },

    onSearchTabActivate: function (cmp) {
        var title = cmp.attributeName === "detailPanel" ? 'Employee' : 'Search : Employee';
        this.lookup(cmp.parentId).setTitle(title);
    },

    onUpdateClick: function (btn) {
        var currentGridView = btn.up('grid'),
            selection = currentGridView.getSelection(),
            recData, value;

        if (selection.length > 1) {
            UTIL.showWarning({ title: "Alert", message: 'Only one record may be updated at a time.' });
        } else if (selection.length === 1) {
            recData = selection[0].data;
            value = recData.id;
            fName = recData.firstName;
            lName = recData.lastName;
            targetCmp = btn.targetGrid,
                dataKey = btn.dataKey,
                title = (!fName ? (recData.recId || recData.id) : `${fName},${lName}(${recData.ssn})`).toLocaleString(),
                parentCmp = btn.parentId;

            this.onRecIdClick(value, targetCmp, dataKey, title.replace(/'/g, "\\'"), parentCmp, 'employee-detail');
        }
    }
});
