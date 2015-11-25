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

        $scope.test = undefined;
        setTimeout(function () {
            $scope.$apply(function () {
                //$scope.test = [111,222,333];
                $scope.test = '12df';
            });
        }, 1000);

        setTimeout(function () {
            $scope.$apply(function () {
                $scope.test = [1111,2222,3333];
            });
        }, 2000);
    }
]);