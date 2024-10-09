Ext.define('MyApp.util.Triggers', {
    alternateClassName: ["TriggerUtil"],
    singleton: true,

    /**
     * Replaces placeholders in a string with corresponding values from the ViewModel.
     * @param {String} str - The string containing placeholders (e.g., "{CountryCode}").
     * @param {Ext.app.ViewModel} viewModel - The ViewModel from which to retrieve values.
     * @returns {String} - The string with placeholders replaced by actual values.
     */
    replacePlaceholders: function (str, viewModel) {
        return str.replace(/{(\w+)}/g, function (match, key) {
            return viewModel.get(key) || match;
        });
    },

    /**
     * Applies the trigger rules defined on a component, modifying target fields based on rule conditions.
     * @param {Ext.Component} cmp - The component to which the trigger rules are applied.
     * @param {Object} scope - The scope from which to look up target components.
     */
    applyTriggers: function (cmp, scope) {
        var me = this;

        cmp.trigger.forEach(function (triggerConfig) {
            var rules = triggerConfig.rule;
            var globalTargetFields = triggerConfig.targetField;

            rules.forEach(function (rule) {
                var ruleVal = eval(me.replacePlaceholders(rule.value, cmp.lookupViewModel()));
                var targetFields = rule.targetField || globalTargetFields;

                // Revert all actions for the target fields if ruleVal is false
                if (!ruleVal) {
                    targetFields.forEach(function (field) {
                        var fieldComponent = Ext.ComponentQuery.query('[reference="' + field + '"]')[0];
                        me.revertRuleAction(fieldComponent, rule.action);
                    });
                }
            });

            // Apply the rule actions where the condition is true
            rules.forEach(function (rule) {
                var ruleVal = eval(me.replacePlaceholders(rule.value, cmp.lookupViewModel()));
                var targetFields = rule.targetField || globalTargetFields;

                if (ruleVal) {
                    targetFields.forEach(function (field) {
                        var fieldComponent = Ext.ComponentQuery.query('[reference="' + field + '"]')[0];
                        me.applyRuleAction(fieldComponent, rule.action);
                    });
                }
            });
        });
    },

    revertRuleAction: function (component, action) {
        var actions = {
            'hide': function () { component ? component.setHidden(false) : null; },
            'show': function () { component ? component.setHidden(true) : null; },
            'disable': function () { component ? component.setDisabled(false) : null; },
            'enable': function () { component ? component.setDisabled(true) : null; },
            'required': function () {component ? component.setIsRequired(false) : null;}
        };

        if (actions[action]) {
            actions[action]();
        } else {
            console.warn('Unknown action:', action);
        }
    },


    /**
     * Applies a specific action (e.g., hide, show, disable, enable) to a component.
     * @param {Ext.Component} component - The component to which the action is applied.
     * @param {String} action - The action to apply (e.g., "hide", "show", "disable", "enable").
     */
    applyRuleAction: function (component, action) {
        this.toggleAction(component, action, true);
    },

    /**
     * Resets all actions on a component to their default states.
     * This ensures that fields are shown and enabled by default.
     * @param {Ext.Component} component - The component to reset.
     */
    resetAllActions: function (component) {
        var defaultActions = ['show', 'enable'];

        // Revert to default state: show and enable the component
        defaultActions.forEach(function (action) {
            this.toggleAction(component, action, true);
        }, this);

        var otherActions = ['hide', 'disable'];

        // Reset inactive states: hide and disable actions should be turned off
        otherActions.forEach(function (action) {
            this.toggleAction(component, action, false);
        }, this);
    },

    /**
     * Toggles a specific action on a component based on the state.
     * @param {Ext.Component} component - The component on which the action is toggled.
     * @param {String} action - The action to toggle (e.g., "hide", "show", "disable", "enable").
     * @param {Boolean} state - The state to apply (true for active, false for inactive).
     */
    toggleAction: function (component, action, state) {
        var actions = {
            'hide': function () { component.setHidden(state); },
            'show': function () { component.setHidden(!state); },
            'disable': function () { component.setDisabled(state); },
            'enable': function () { component.setDisabled(!state); },
            'required': function () {component.setIsRequired(state);}
        };

        // Execute the corresponding action, or log a warning if the action is unknown
        if (actions[action]) {
            actions[action]();
        } else {
            console.warn('Unknown action:', action);
        }
    }
});