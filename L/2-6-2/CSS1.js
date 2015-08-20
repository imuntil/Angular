/**
 * Created by jtun02 on 15/8/18.
 */
var myCSSModule = angular.module('MyCSSModule', []);
myCSSModule.controller('CSSCtrl', ['$scope',
    function($scope) {
        $scope.color = 'red';
        $scope.setGreen = function() {
            $scope.color = 'green';
        }
    }
]);