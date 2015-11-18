/**
 * Created by 斌 on 2015/11/18.
 */
(function () {
    "use strict";

    angular.module('app.controllers.WelcomeAController', [

    ])
        .controller('WelcomeAController', WelcomeAController);

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
})();