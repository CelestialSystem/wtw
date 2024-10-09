Ext.define('MyApp.view.main.employee.Cases', {
    extend: 'Ext.panel.Panel',

    requires:['Ext.form.field.Radio'],
    
    xtype: 'cases',

    height: '100%',
    padding: '0 5',
    border: false,
    defaults: {
        xtype: 'fieldset',
        labelWidth: 200
    },
    cls: 'form-cls',
    style: 'background:#f1f1f1;',
    scrollable: true,

    tbar: [{
        xtype: 'button',
        text: 'update',
        iconCls: "x-fa fa-redo"
    }],

    items: [{
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Current Case',
            labelAlign: 'right',
            labelWidth: 200,
            padding: '5 0 0 0',
            value: '-- Not Selected --'
        }]
    }, {
        title: '1) Employment Assumptions',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'date-field',
            fieldLabel: 'Termination Date'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Union Eligible for Lump Sum',
            value: '-- Not Selected --'
        }]
    }, {
        title: '2) Calculation Dates',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Benefit Commencement Date',
            defaultType: 'radiofield',
            layout: 'vbox',
            items: [
                {
                    boxLabel: 'Normal Retirement Date',
                    name: 'date'
                }, {
                    boxLabel: 'ASAP on/after Termination',
                    name: 'date'
                }, {
                    boxLabel: 'Age',
                    name: 'date'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Years'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Months'
                }, {
                    boxLabel: 'Other',
                    name: 'date'
                }, {
                    xtype: 'date-field',
                    fieldLabel: 'Selected BCD'
                }]
        }, {
            xtype: 'date-field',
            fieldLabel: 'Cashout Test Date'
        }]
    }, {
        title: '3) Calculation Assumptions',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Calc Type',
            defaultType: 'radiofield',
            layout: 'vbox',
            items: [
                {
                    boxLabel: 'Actual',
                    name: 'type'
                }, {
                    boxLabel: 'Termination',
                    name: 'type'
                }, {
                    boxLabel: 'Estimate',
                    name: 'type'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Pay Growth Percent (Enter 5% as 0.05)',
                    labelWidth: 220
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Pay Override',
                    labelWidth: 220
                }, {
                    boxLabel: 'Batch Calculation',
                    name: 'type'
                }, {
                    boxLabel: 'ROL Eligibility Calculation',
                    name: 'type'
                }, {
                    boxLabel: 'ROL Calculation',
                    name: 'type'
                }]
        }, {
            xtype: 'textfield',
            fieldLabel: 'Spouse First Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Spouse Last Name'
        }, {
            xtype: 'date-field',
            fieldLabel: 'Spouse Date of Birth'
        }]
    }, {
        title: '4) Beneficiary',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Beneficiary',
            width: 700,
            value: '-- Not Selected --'
        }]
    }, {
        title: '5) Override Values',
        defaults: {
            xtype: 'textfield',
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'date-field',
            fieldLabel: 'Beneficiary DOB (Estimates Only)'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Beneficiary Type (Estimates Only)',
            value: '-- Not Selected --'
        }, {
            fieldLabel: 'Monthly Accrued Benefit at NRD'
        }, {
            fieldLabel: 'Monthly Accrued Benefit at BCD'
        }, {
            fieldLabel: 'Vesting Service'
        }, {
            fieldLabel: 'Benefit Service'
        }, {
            fieldLabel: 'Cash Balance Interest Rate (Enter5% as 0.05)'
        }]
    }, {
        title: '6) Termination and Batch Processing',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Batch Process',
            defaultType: 'radiofield',
            layout: 'vbox',
            items: [
                {
                    boxLabel: 'Termination',
                    name: 'type'
                }, {
                    xtype: 'date-field',
                    fieldLabel: 'Involuntary Cashout Test Date',
                    labelWidth: 180
                }, {
                    boxLabel: 'Roll-up',
                    name: 'type'
                }, {
                    xtype: 'date-field',
                    fieldLabel: 'Effective Date'
                }, {
                    boxLabel: 'Statement File',
                    name: 'type'
                }, {
                    boxLabel: 'Regression',
                    name: 'type'
                }]
        }]
    }, {
        title: '7) Admin Overrides',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200,
            xtype: 'textfield'
        },
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Suppress Fatal Errors',
            value: '-- Not Selected --'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has Single Life Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: 'Single Life Annuity',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 5-Year Certain & Life Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '5-Year Certain & Life Annuity',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 10-Year Certain & Life Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '10-Year Certain & Life Annuity',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 15-Year Certain & Life Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '15-Year Certain & Life Annuity',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has Level Income to 62 Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: 'Level Income to 62 Pre-62 Amount',
            width: 348
        }, {
            fieldLabel: 'Level Income to 62 Post-62 Amount',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has Level Income to 65 Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: 'Level Income to 65 Pre-65 Amount',
            width: 348
        }, {
            fieldLabel: 'Level Income to 65 Post-65 Amount',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 50% Joint & Survivor Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '50% Joint & Survivor Annuity',
            width: 348
        }, {
            fieldLabel: '50% Joint & Survivor Annuity(Beneficiary)',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 60% Joint & Survivor Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '60% Joint & Survivor Annuity',
            width: 348
        }, {
            fieldLabel: '60% Joint & Survivor Annuity(Beneficiary)',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 66 2/3% Joint & Survivor Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '66 2/3% Joint & Survivor Annuity',
            width: 348
        }, {
            fieldLabel: '66 2/3% Joint & Survivor Annuity(Beneficiary)',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 75% Joint & Survivor Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '75% Joint & Survivor Annuity',
            width: 348
        }, {
            fieldLabel: '75% Joint & Survivor Annuity(Beneficiary)',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has 100% Joint & Survivor Annuity?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: '100% Joint & Survivor Annuity',
            width: 348
        }, {
            fieldLabel: '100% Joint & Survivor Annuity(Beneficiary)',
            width: 348
        }, {
            xtype: 'combobox',
            fieldLabel: 'Has Lump Sum?',
            value: '-- Not Selected --'
        }, {
            fieldLabel: 'Lump Sum',
            width: 348
        }]
    }, {
        title: 'ESS Purpose Built Calculator Values',
        defaults: {
            labelAlign: 'right',
            labelWidth: 200
        },
        items: [{
            xtype: 'textarea',
            fieldLabel: 'ESS PBC Bridging Scenario ID',
            width:'60%',
            height: 150
        }, {
            xtype: 'textarea',
            fieldLabel: 'ESS PBC ROL Calculation ID',
            width:'60%',
            height: 150
        }, {
            xtype: 'textfield',
            fieldLabel: 'ESS PBC ROL Eligibility Plan'
        }]
    }]
});