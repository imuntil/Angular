/**
 * Created by 斌 on 2015/11/25.
 */
define(
    ['angular'],
    function (angular) {
        "use strict";

        function TopBarController() {
            var vm = this;
        }
        angular.module('app.controllers.TopBarController', [])
            .controller('TopBarController', TopBarController);
    }
);
