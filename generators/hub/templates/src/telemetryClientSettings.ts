import * as tc from "telemetryclient-team-services-extension";

export const settings: tc.TelemetryClientSettings = {
    key: "<%= InstrumentationKey %>",
    extensioncontext: "<%= ExtensionName %>",
    disableTelemetry: "false",
    disableAjaxTracking: "false",
    enableDebug: "false"
};