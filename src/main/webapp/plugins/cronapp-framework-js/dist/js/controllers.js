! function(e) {
    angular.module("custom.controllers", []), app.controller("HomeController", ["$controller", "$scope", "$http", "$rootScope", "$state", "$translate", "Notification", "ReportService", "UploadService", function(e, t, o, r, n, p, a, c, l) {
        r.http = o, r.Notification = a, r.UploadService = l, r.getReport = function(e, t) {
            c.openReport(e, t)
        }, app.registerEventsCronapi(t, p);
        for (var i in app.userEvents) t[i] = app.userEvents[i].bind(t);
        t.message = {};
        try {
            e("AfterHomeController", {
                $scope: t
            })
        } catch (e) {}
        try {
            t.blockly.events.afterHomeRender && t.blockly.events.afterHomeRender()
        } catch (e) {}
    }])
}(app);