/**
 * Created by 斌 on 2016/1/20.
 */
(function () {
    "use strict";
    angular.module('app.services.JC', [
        'app.services.http'
    ])
        .factory('JC', JC);

    JC.$inject = ['commonData', '$http', '$q'];
    function JC(commonData, $http, $q) {
        var service = {
            join:join
        };
        return service;

        function join(params) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:params,
                url:commonData.BASE_URL + 'saveBakerBkr!saveBaker'
            }).success(function (data) {
                defer.resolve(data);
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }
    }
})();