/**
 * Created by ±ó on 2015/11/8.
 */
(function () {
    angular.module('app.services.couponsAbout', [
        'app.services.http'
    ])
        .factory('couponsAbout', couponsAbout);

    couponsAbout.$inject = ['commonData', '$q', '$http'];
    function couponsAbout(commonData, $q, $http) {
        var service = {
            chosenCp:{},
            coupons:[],
            getCoupons:getCoupons
        };
        return service;
        function getCoupons() {
            var defer = $q.defer();
            $http({
                method:'GET',
                url:commonData.BASE_URL + 'selectPerPr!selectPer',
                params:{openid:commonData.OPENID}
            }).success(function (data) {
                if (data['resultcode'] === 1 || data['resultcode'] === '1') {
                    service.coupons = data['result'];
                    defer.resolve(service.coupons);
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }
    }
})();