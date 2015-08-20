/**
 * Created by jtun02 on 15/8/18.
 */

var userInfoModule = angular.module('UserInfoModule', []);
userInfoModule.controller('UserInfoCtrl', ['$scope', function($scope) {
    $scope.userInfo = {
        email:'imuntil@qq.com',
        password:'123456789',
        autoLogin:true
    };

    $scope.getFormData = function() {
        console.log($scope.userInfo);
    };

    $scope.setFormData = function() {
        $scope.userInfo = {
            email:'imuntil@126.com',
            password:'qazxsw',
            autoLogin:false
        }
    };

    $scope.resetForm = function() {
        $scope.userInfo = {
            email:'',
            password:'',
            autoLogin:true
        }
    }
}]);