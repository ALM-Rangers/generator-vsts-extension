VSS.require("TFS/Dashboards/WidgetHelpers", function (WidgetHelpers) {
    WidgetHelpers.IncludeWidgetConfigurationStyles();
    VSS.register("<%= WidgetId %>-Configuration", function () {
        var $queryDropdown = $("#query-path");

        return {
            load: function (widgetSettings, widgetConfigurationContext) {
                var settings = JSON.parse(widgetSettings.customSettings.data);
                if (settings && settings.queryPath) {
                    $queryDropdown.val(settings.queryPath);
                }
                $queryDropdown.on("change", function () {
                    var customSettings = {
                        data: JSON.stringify({
                            queryPath: $queryDropdown.val()
                        })
                    };
                    var eventName = WidgetHelpers.WidgetEvent.ConfigurationChange;
                    var eventArgs = WidgetHelpers.WidgetEvent.Args(customSettings);
                    widgetConfigurationContext.notify(eventName, eventArgs);
                });

                return WidgetHelpers.WidgetStatusHelper.Success();
            },
            onSave: function () {
                var customSettings = {
                    data: JSON.stringify({
                        queryPath: $queryDropdown.val()
                    })
                };
                return WidgetHelpers.WidgetConfigurationSave.Valid(customSettings);
            }
        }
    });
    VSS.notifyLoadSucceeded();
});