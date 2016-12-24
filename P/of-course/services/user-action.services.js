/**
 * Created by 斌 on 2016/12/8.
 */
(function () {
    "use strict";
    angular.module('oc.services.userAction', [])
        .factory('userAction', userAction);

    userAction.$inject = ['$http', '$q'];
    function userAction($http, $q) {
        var service = {
            login:login,
            register:register,
            modify:modifyPassword
        };
        return service;

        function login(data) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:data,
                url:'/login'
            }).success(function (response) {
                defer.resolve({code:1});
            }).error(function (response) {
                defer.reject({code:0});
            });
            return defer.promise;
        }

        function register(data) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:data,
                url:'/register'
            }).success(function (response) {
                defer.resolve({code:1});
            }).error(function (response) {
                defer.reject({code:0});
            });

            return defer.promise;
        }

        function modifyPassword(old, _new) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:{old:old, _new:_new},
                url:'/modify'
            }).success(function (response) {
                defer.resolve({code:1});
            }).error(function (response) {
                defer.reject({code:0});
            });
            return defer.promise;
        }
    }

})();