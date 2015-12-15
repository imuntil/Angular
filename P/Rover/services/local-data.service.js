/**
 * Created by 斌 on 2015/12/15.
 */
define(
    ['angular'],
    function (angular) {
        "use strict";

        localData.$inject = ['$cookies', '$rootScope'];
        var key = 'temp-rover-local-data';
        function localData($cookies, $rootScope) {
            var services = {
                data:{},
                fetch:fetch,
                watch:watch
            };
            return services;
            function fetch() {
                services.data = $cookies.getObject(key) || {course:1,step:1};
                console.log(services.data);
            }
            function update() {
                $cookies.putObject(key, services.data);
            }
            function watch() {
                $rootScope.$watch(function () {
                    return services.data;
                }, function (val) {
                    if (val) {
                        update();
                    }
                });
            }
        }
        angular.module('app.services.localData',['ngCookies'])
            .factory('localData', localData);
    }
);