/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('http.services', [])
        .constant('commonData', {
            BASE_URL: 'http://m.jtuntech.com/Baking/',
            OPENID:123
        })
        .factory('getAddressesData', getAddressesData);

    getAddressesData.$inject = ['$http', '$q', 'commonData'];
    function getAddressesData($http, $q, commonData) {
        var service = {
            addresses:[],
            getAddresses:getAddresses
        };
        return service;

        function getAddresses() {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:{openid:commonData.OPENID},
                url:commonData.BASE_URL + 'selectAddressAds!selectAddress'
            }).success(function (data) {
                if (data['resultcode'] === '1' || data['resultcode'] === 1) {
                    defer.resolve(data);
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