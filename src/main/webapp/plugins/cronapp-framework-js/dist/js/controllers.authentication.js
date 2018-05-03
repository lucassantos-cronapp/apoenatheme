! function(e) {
    angular.module("custom.controllers", []),
    app.controller("DashController", function($scope, $state, $controller){
      console.log("DashController");
        
        // COMPONENTS

        $scope.toggleNav = function(){
          console.log('Toggle');
          $scope.isNavCollapsed = !$scope.isNavCollapsed;
          console.log($scope.isNavCollapsed);
        };        

        $scope.toggleDropDown = function(el){
          console.log(el);
        }
    
        // jQuery('.apoena-dropdown-item').click(function(){
        //     console.log(this);
        //     $(this).children('a').children('i').toggleClass('apoena-dropdown-active');
        //     $(this).children('ul').toggleClass('active');
        // });         
        
        
        // Apoena Modal
        $scope.isModalClose = false;
        
        $scope.toggleModal = function(){
          $scope.isModalClose = !$scope.isModalClose;  
        }
        
        // UI-Bootstrap
        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
        
        // ChartJS
        
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                display: true,
                position: 'left'
              },
              {
                id: 'y-axis-2',
                type: 'linear',
                display: true,
                position: 'right'
              }
            ]
          }
        };       
        
    }),
    app.controller("LoginController", ["$controller", "$scope", "$http", "$location", "$rootScope", "$window", "$state", "$translate", "Notification", "ReportService", "UploadService", function(e, o, n, t, r, s, a, i, l, c, u) {
        console.log('LoginCTRL');
        let $scope = o;
        let location = t;
        
         // Login
        function c(e, o, n, t) {
            "undefined" != typeof Storage && (sessionStorage.setItem("_u", JSON.stringify(e)), s.session = JSON.parse(sessionStorage._u)), a.go("home")
        }

        function l(e, o, n, s) {
            var t = 401 == o ? r.instant("Login.view.invalidPassword") : e;
            i.error(t)
        }
        app.registerEventsCronapi(e, r), e.message = {}, e.login = function() {
            e.message.error = void 0;
            var n = {
                username: e.username.value,
                password: e.password.value
            };
            o({
                method: "POST",
                url: "auth",
                data: $.param(n),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(c).error(l)
        }              
        
    }]
    
    ), app.controller("HomeController", ["$controller", "$scope", "$http", "$rootScope", "$state", "$translate", "Notification", "ReportService", "UploadService", function(e, o, n, t, r, s, a, i, l) {
        app.registerEventsCronapi(o, s), t.http = n, t.Notification = a, t.UploadService = l, t.getReport = function(e, o) {
            i.openReport(e, o)
        }, o.message = {}, o.selecionado = {
            valor: 1
        }, o.refreshToken = function() {
            n({
                method: "GET",
                url: "auth/refresh"
            }).success(function(e, n, t, r) {
                console.log("revive :", new Date(e.expires)), sessionStorage.setItem("_u", JSON.stringify(e)), setTimeout(function() {
                    o.refreshToken()
                }, 18e5)
            }).error(function() {})
        }, t.session = sessionStorage._u ? JSON.parse(sessionStorage._u) : null, t.session ? (t.myTheme = t.session.user.theme, o.$watch("myTheme", function(e) {
            void 0 !== e && "" !== e && $("#themeSytleSheet").attr("href", "plugins/cronapp-framework-js/css/themes/" + e + ".min.css")
        }), t.session.token && o.refreshToken()) : o.ignoreAuth || (sessionStorage.removeItem("_u"), window.location.href = ""), t.logout = function() {
            function e() {
                t.session = {}, "undefined" != typeof Storage && sessionStorage.removeItem("_u"), window.location.href = ""
            }
            n({
                method: "GET",
                url: "logout",
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(e).error(e)
        }, o.changePassword = function() {
            function e(e, o, n, r) {
                a.info(s.instant("Home.view.passwordChanged")), t()
            }

            function o(e, o, n, t) {
                var r = o >= 401 ? s.instant("Home.view.InvalidPassword") : e;
                a.error(r)
            }

            function t() {
                oldPassword.value = "", newPassword.value = "", newPasswordConfirmation.value = "", $("#modalPassword").modal("hide")
            }
            if (function() {
                    return "" !== oldPassword.value && "" !== newPassword.value && "" !== newPasswordConfirmation.value || ("" === newPasswordConfirmation.value && a.error(s.instant("Home.view.ConfirmationPasswordCanNotBeEmpty")), "" === newPassword.value && a.error(s.instant("Home.view.NewPasswordCanNotBeEmpty")), "" === oldPassword.value && a.error(s.instant("Home.view.PreviousPasswordCanNotBeEmpty")), !1)
                }()) {
                var r = {
                    oldPassword: oldPassword.value,
                    newPassword: newPassword.value,
                    newPasswordConfirmation: newPasswordConfirmation.value
                };
                n({
                    method: "POST",
                    url: "changePassword",
                    data: $.param(r),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(e).error(o)
            }
        };
        var c = function() {
            var e = $(this);
            e.closest(".sub-menu").length > 0 && e.closest(".navbar-nav").collapse("hide")
        };
        o.$on("$viewContentLoaded", function() {
            var e = $(".navbar-nav");
            e.off("click", "a", c), e.on("click", "a", c)
        }), o.themes = ["cerulean", "cosmo", "cyborg", "darkly", "flatly", "journal", "lumen", "paper", "readable", "sandstone", "simplex", "slate", "spacelab", "superhero", "united", "yeti"], o.changeTheme = function(e) {
            function o(o, n, r, s) {
                t.session.theme = e, t.session.user.theme = e, sessionStorage.setItem("_u", JSON.stringify(t.session))
            }

            function r(e, o, n, t) {
                var r = e;
                a.error(r)
            }
            if (void 0 !== e) {
                $("body").append('<div id="transition" />'), $("#transition").css({
                    "background-color": "#FFF",
                    zIndex: 1e5,
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                    overflow: "hidden",
                    display: "block"
                }), $("#transition").fadeIn(800, function() {
                    $("#themeSytleSheet").attr("href", "plugins/cronapp-framework-js/css/themes/" + e + ".min.css"), t.myTheme = e, $("#transition").fadeOut(1e3, function() {
                        $("#transition").remove()
                    })
                });
                var s = {
                    theme: e
                };
                n({
                    method: "POST",
                    url: "changeTheme",
                    data: $.param(s),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }).success(o).error(r)
            }
        };
        try {
            e("AfterHomeController", {
                $scope: o
            })
        } catch (e) {}
        try {
            o.blockly.events.afterHomeRender && o.blockly.events.afterHomeRender()
        } catch (e) {}
    }]), app.controller("PublicController", ["$controller", "$scope", function(e, o) {
        o.ignoreAuth = !0, angular.extend(this, e("HomeController", {
            $scope: o
        }))
    }]), app.controller("SocialController", ["$controller", "$scope", function(e, o) {
        o.checkSocial = !0, angular.extend(this, e("LoginController", {
            $scope: o
        })), o.login(!0)
    }])
}(app), window.safeApply = function(e) {
    var o = this.$root.$$phase;
    "$apply" == o || "$digest" == o ? e && "function" == typeof e && e() : this.$apply(e)
};