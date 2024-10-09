Ext.define('MyApp.overrides.Component', {
    override: 'Ext.Component',

    renderConfig: {
        /**
         * @cfg {object} dataAttribute
         * Applies data attribute to the parent dom element within a component.
         * The `data-` part of the string is auto generated as part of "dataset".
         * Attribute name should be PascalCase. For records in a set, suffix the ID with
         * an underscore and the bind. EG:CaseLocation_{record.unique_id}
         * Example usage:
         *  dataAttribute: {
         *      'data-testid': 'CaseStatus'
         *  },
         *  dataAttribute: {
         *      'data-testid1': 'CaseStatus1',
         *      'data-testid2': 'CaseStatus2',
         *      'data-testid3': 'CaseStatus3'
         *  },
         *  For components with stores that you want to access, wrap it in a bind.
         *  bind: {
         *      dataAttribute: {
         *          'data-testid': 'CaseLocation_{currentCaseRecord.c__location || currentCaseRecord.location.site_name}'
         *      }
         *  }
         *
         * Result: <div data-attribute-name="foo-bar"></div>
         * @accessor
         */
        dataAttribute: null,
    },
    applyDataAttribute: function(dataAttribute) {
        if (Ext.isObject(dataAttribute)) {
            Object.keys(dataAttribute).forEach(attrName => {
                this.el.dom.setAttribute(attrName, dataAttribute[attrName]);
            });
        }
    },
});