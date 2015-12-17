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
                fetch:fetch,
                check:check
            };
            return services;
            function check(course, step) {
                if (course < services.data.course) {return;}
                else if (course === services.data.course) {
                    if (step > services.data.step) {
                        services.data.step = step;
                        update();
                    }
                } else {
                    services.data.course = course;
                    services.data.step = step || 1;
                    update();
                }
            }
            function fetch() {
                $cookies.putObject(key, {course:2,step:1});
                if (services.data.course === undefined) {
                    console.log('get');
                    services.data = $cookies.getObject(key) || {course:1,step:1};
                    //watch();
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