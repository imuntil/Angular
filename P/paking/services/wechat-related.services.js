/**
 * Created by 斌 on 2015/11/11.
 */
(function () {
    "use strict";

    angular.module('app.services.wechatRelated', [

    ])
        .factory('userAuthorization', userAuthorization);

    userAuthorization.$inject = ['$http', '$q', '$window', '$location'];
    function userAuthorization($http, $q, $window, $location) {
        var output = 'http://api.jtuntech.com/event/2015/Q2/gymax/wx/output.php',
            login = 'http://api.jtuntech.com/event/2015/Q2/gymax/wx/login.php?gtype=';
        var location = $location.absUrl();
        var service = {
            start:start
        };
        return service;

        function start(gtype) {
            var defer = $q.defer();
            gtype = gtype || 1;
            $http({
                method:'GET',
                url:output
            }).success(function (data) {
                var reUrl = login + gtype +'&url=' + location;
                if (gtype === 1) {
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenid) {
                        defer.resolve(data);
                    } else {
                        reUa(reUrl);
                    }

                } else if (gtype === 2) {
                    if (parseInt(data.status, 10) === 1
                        && data.msg.UserOpenid
                        && data.msg.Uinfo.nickname) {
                        defer.resolve(data);
                    } else {
                        reUa(reUrl);
                    }
                }

            }).error(function () {
                reUa(login + gtype +'&url=' + location)
            });
            return defer.promise;
        }

        function reUa(url) {
            console.log(url);
            $window.location.href = url;
        }
    }
})();