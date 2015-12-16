/**
 * Created by 斌 on 2015/12/15.
 */
define(
    ['angular'],
    function (angular) {
        "use strict";

        localData.$inject = ['$cookies', '$rootScope'];
        var key = 'temp-rover-local-data',
            watching = false;
        function localData($cookies, $rootScope) {
            var services = {
                data:{course:undefined, step:undefined},
                fetch:fetch
            };
            return services;
            function fetch() {
                if (services.data.course === undefined) {
                    console.log('get');
                    services.data = $cookies.getObject(key) || {course:1,step:1};
                    watch();
                }
                return services.data;
            }
            function update() {
                $cookies.putObject(key, services.data);
            }
            function watch() {
                if (watching) {return};
                console.log('watching');
                watching = true;
                $rootScope.$watch(function () {
                    return services.data;
                }, function (val) {
                    if (val) {
                        update();
                    }
                }, true);
            }
        }
        angular.module('app.services.localData',['ngCookies'])
            .factory('localData', localData);
    }
);