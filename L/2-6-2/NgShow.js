/**
 * Created by jtun02 on 15/8/19.
 */
var myCSSModule = angular.module('MyCSSModule', []);
myCSSModule.controller('DeathRayMenuController', ['$scope',
    function ($scope) {
        $scope.menuState = {show: false};
        $scope.toggleMenu = function () {
            $scope.menuState.show = !$scope.menuState.show;
        }
    }
]);