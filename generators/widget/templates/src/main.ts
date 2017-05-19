<% if (UseAITelemetry) { %>
    import * as tc from "telemetryclient-team-services-extension";
    import telemetryClientSettings = require("./telemetryClientSettings");
<% } %>
        VSS.require(["TFS/Dashboards/WidgetHelpers", "TFS/WorkItemTracking/RestClient"], function (WidgetHelpers, TFS_Wit_WebApi) {
            WidgetHelpers.IncludeWidgetStyles();
            VSS.register("<%= WidgetId %>", function () {
                const projectId = VSS.getWebContext().project.id;
                const getQueryInfo = function (widgetSettings) {
                    // Extract query path from widgetSettings.customSettings and ask user to configure one if none is found
                    const settings = JSON.parse(widgetSettings.customSettings.data);
                    if (!settings || !settings.queryPath) {
                        const $container = $("#query-info-container");
                        $container.empty();
                        $container.text("Sorry nothing to show, please configure a query path");
                        return WidgetHelpers.WidgetStatusHelper.Success();
                    }
                    // Get a WIT client to make REST calls to VSTS
                    return TFS_Wit_WebApi.getClient().getQuery(projectId, settings.queryPath)
                        .then(function (query) {
                            // Create a list with query details
                            const $list = $("<ul>");
                            $list.append($("<li>").text("Query Id: " + query.id));
                            $list.append($("<li>").text("Query Name: " + query.name));
                            $list.append($("<li>").text("Created By: " + (query.createdBy ? query.createdBy.displayName : "<unknown>")));
                            // Append the list to the query-info-container
                            const $container = $("#query-info-container");
                            $container.empty();
                            $container.append($list);
                            // Use the widget helper and return success as Widget Status
                            return WidgetHelpers.WidgetStatusHelper.Success();
                        }, function (error) {
                            // Use the widget helper and return failure as Widget Status
                            return WidgetHelpers.WidgetStatusHelper.Failure(error.message);
                        });
                };
                return {
                    load: function (widgetSettings){
<% if (UseAITelemetry) { %>
tc.TelemetryClient.getClient(telemetryClientSettings.settings).trackPageView("<%= WidgetId %>.Index");
<% } %>
                        // Set your title
                        const $title = $("h2.title");
                        $title.text(widgetSettings.name);
                        return getQueryInfo(widgetSettings);
                    },
                    reload: function (widgetSettings) {
                        const $title = $("h2.title");
                        $title.text(widgetSettings.name);
                        return getQueryInfo(widgetSettings);
                    }
                };
            });
            VSS.notifyLoadSucceeded();
        });