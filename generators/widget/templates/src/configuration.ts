VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("<%= WidgetId %>-Configuration", function () {
        const $queryDropdown = $("#query-path");

        return {
            load: function (widgetSettings, widgetConfigurationContext) {
                const settings = JSON.parse(widgetSettings.customSettings.data);
                if (settings && settings.queryPath) {
                    $queryDropdown.val(settings.queryPath);
                }
                $queryDropdown.on("change", function () {
                    const customSettings = {
                        data: JSON.stringify({
                            queryPath: $queryDropdown.val()
                        })
                    };
                    const eventName = WidgetHelpers.WidgetEvent.ConfigurationChange;
                    const eventArgs = WidgetHelpers.WidgetEvent.Args(customSettings);
                    widgetConfigurationContext.notify(eventName, eventArgs);
                });

                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            onSave: function () {
                const customSettings = {
                    data: JSON.stringify({
                        queryPath: $queryDropdown.val()
                    })
                };
                return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
            }
        };
    });
    VSS.notifyLoadSucceeded();
});