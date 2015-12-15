/**
 * Created by 斌 on 2015/11/18.
 */
define(
    ['angular', 'localData'],
    function (angular) {
        "use strict";
        WelcomeAController.$inject = ['$interval', '$state', 'localData'];
        function WelcomeAController($interval, $state, localData) {
            var time = 3,
                interval;

            localData.fetch();
            localData.watch();

            console.log('w.w');

            interval = $interval(function () {
                if (time > 0) {
                    time -= 1;
                } else if (time === 0) {
                    $interval.cancel(interval);
                    //$state.go('welcome-2')
                }
            }, 1000);
        }
        angular.module('app.controllers.WelcomeAController', [])
            .controller('WelcomeAController', WelcomeAController);
    }
);