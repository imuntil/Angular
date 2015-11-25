/**
 * Created by 斌 on 2015/11/18.
 */
define(
    ['angular'],
    function (angular) {
        "use strict";
        WelcomeAController.$inject = ['$interval', '$state'];
        function WelcomeAController($interval, $state) {
            var time = 3,
                interval;

            interval = $interval(function () {
                if (time > 0) {
                    time -= 1;
                } else if (time === 0) {
                    $interval.cancel(interval);
                    $state.go('welcome-2')
                }
            }, 1000);
        }
        angular.module('app.controllers.WelcomeAController', [])
            .controller('WelcomeAController', WelcomeAController);
    }
);