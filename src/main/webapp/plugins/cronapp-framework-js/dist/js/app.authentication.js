var cronappModules = ["ui.router", "ui.select", "ui-select-infinity", "ngResource", "ngSanitize", "custom.controllers", "custom.services", "datasourcejs", "chart.js", "ngJustGage", "pascalprecht.translate", "tmh.dynamicLocale", "ui-notification", "ui.bootstrap", "ngFileUpload", "report.services", "upload.services"];
window.customModules && (cronappModules = cronappModules.concat(window.customModules));
var app = function() {
    return angular.module("MyApp", cronappModules).constant("LOCALES", {
        locales: {
            pt_br: "Portugues (Brasil)",
            en_us: "English"
        },
        preferredLocale: "pt_br"
    }).config(["$httpProvider", function(e) {
        var t = ["$q", "$rootScope", function(e, t) {
            return {
                request: function(e) {
                    var t = JSON.parse(sessionStorage.getItem("_u"));
                    return t && t.token && (e.headers["X-AUTH-TOKEN"] = t.token, window.uToken = t.token), e
                }
            }
        }];
        e.interceptors.push(t)
    }]).config(["$stateProvider", "$urlRouterProvider", "NotificationProvider", function(e, t, r) {
        r.setOptions({
            delay: 5e3,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: "right",
            positionY: "top"
        }), e.state("login", {
            url: "",
            controller: "LoginController",
            templateUrl: "views/login.view.html"
        }).state("dashboard", {
            url: "/dash",
            controller: "DashController",
            templateUrl: function(e) {
                return "views/error/dashboard.view.html"
            }
        }).state("social", {
            url: "/connected",
            controller: "SocialController",
            templateUrl: "views/login.view.html"
        }).state("socialError", {
            url: "/notconnected",
            controller: "SocialController",
            templateUrl: "views/login.view.html"
        }).state("main", {
            url: "/",
            controller: "LoginController",
            templateUrl: "views/login.view.html"
        }).state("publicRoot", {
            url: "/public/{name:.*}",
            controller: "PageController",
            templateUrl: function(e) {
                return "views/public/" + e.name + ".view.html"
            }
        }).state("public", {
            url: "/home/public",
            controller: "PublicController",
            templateUrl: function(e) {
                return "views/public/home.view.html"
            }
        }).state("public.pages", {
            url: "/{name:.*}",
            controller: "PageController",
            templateUrl: function(e) {
                return "views/public/" + e.name + ".view.html"
            }
        }).state("home", {
            url: "/home",
            controller: "HomeController",
            templateUrl: "views/logged/home.view.html"
        }).state("home.pages", {
            url: "/{name:.*}",
            controller: "PageController",
            templateUrl: function(e) {
                return "views/" + e.name + ".view.html"
            }
        }).state("404", {
            url: "/error/404",
            controller: "PageController",
            templateUrl: function(e) {
                return "views/error/404.view.html"
            }
        }).state("403", {
            url: "/error/403",
            controller: "PageController",
            templateUrl: function(e) {
                return "views/error/403.view.html"
            }
        }), t.otherwise("/error/404")
    }]).config(["$translateProvider", "tmhDynamicLocaleProvider", function(e, t) {
        e.useMissingTranslationHandlerLog(), e.useStaticFilesLoader({
            files: [{
                prefix: "i18n/locale_",
                suffix: ".json"
            }, {
                prefix: "plugins/cronapp-framework-js/i18n/locale_",
                suffix: ".json"
            }]
        }), e.registerAvailableLanguageKeys(["pt_br", "en_us"], {
            "en*": "en_us",
            "pt*": "pt_br",
            "*": "pt_br"
        });
        var r = (window.navigator.userLanguage || window.navigator.language || "pt_br").replace("-", "_");
        e.use(r.toLowerCase()), e.useSanitizeValueStrategy("escaped"), t.localeLocationPattern("plugins/angular-i18n/angular-locale_{{locale}}.js"), moment && moment.locale(r)
    }]).directive("crnValue", ["$parse", function(e) {
        return {
            restrict: "A",
            require: "^ngModel",
            link: function(t, r, o, n) {
                var a;
                a = o.value ? o.value : e(o.crnValue)(t), r.attr("data-evaluated", JSON.stringify(a)), r.bind("click", function(e) {
                    t.$apply(function() {
                        n.$setViewValue(a)
                    }.bind(r))
                })
            }
        }
    }]).decorator("$xhrFactory", ["$delegate", "$injector", function(e, t) {
        return function(r, o) {
            var n = e(r, o),
                a = t.get("$http"),
                l = a.pendingRequests[a.pendingRequests.length - 1];
            return angular.isFunction(l.onProgress) && n.upload.addEventListener("progress", l.onProgress), n
        }
    }]).controller("PageController", ["$controller", "$scope", "$stateParams", "$location", "$http", "$rootScope", "$translate", function(e, t, r, o, n, a, l) {
        app.registerEventsCronapi(t, l), t.params = r, t.$http = n;
        var i = o.search();
        for (var s in i) i.hasOwnProperty(s) && (t.params[s] = i[s]);
        t.registerComponentScripts = function() {
            $(".carousel-indicators li").on("click", function() {
                var e = "#" + $(this).parent().parent().parent().attr("id"),
                    t = $(e + " .carousel-indicators li").index(this);
                $(e + " #carousel-example-generic").carousel(t)
            })
        }, t.registerComponentScripts();
        try {
            e("AfterPageController", {
                $scope: t
            })
        } catch (e) {}
        try {
            t.blockly.events.afterPageRender && t.blockly.events.afterPageRender()
        } catch (e) {}
    }]).run(["$rootScope", "$state", function(e, t) {
        e.$on("$stateChangeError", function() {
            if (arguments.length >= 6) {
                var e = arguments[5];
                404 !== e.status && 403 !== e.status || t.go(e.status.toString())
            } else t.go("404")
        })
    }])
}(window);
app.userEvents = {}, app.config = {}, app.config.datasourceApiVersion = 2, app.bindScope = function(e, t) {
    var r = {};
    for (var o in t) "string" == typeof t[o] ? r[o] = t[o] : "function" == typeof t[o] ? r[o] = t[o].bind(e) : r[o] = app.bindScope(e, t[o]);
    return r
}, app.registerEventsCronapi = function(e, t) {
    for (var r in app.userEvents) e[r] = app.userEvents[r].bind(e);
    e.vars = {};
    try {
        cronapi && (e.cronapi = app.bindScope(e, cronapi), e.cronapi.$scope = e, e.safeApply = safeApply, t && (e.cronapi.$translate = t))
    } catch (e) {
        console.info("Not loaded cronapi functions"), console.info(e)
    }
    try {
        blockly && (e.blockly = app.bindScope(e, blockly))
    } catch (e) {
        console.info("Not loaded blockly functions"), console.info(e)
    }
}, window.safeApply = function(e) {
    var t = this.$root.$$phase;
    "$apply" == t || "$digest" == t ? e && "function" == typeof e && e() : this.$apply(e)
};