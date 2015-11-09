/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    angular.module('app.services.productsAbout', [
        'app.services.http'
    ])
        .factory('productsAbout', productsAbout);

    productsAbout.$inject = ['commonData', '$q', '$http'];
    function productsAbout(commonData, $q, $http) {
        var service = {
            getProducts:getProducts,
            products:[],
            getProductDetail:getProductDetail,
            product:{}
        };
        return service;

        function getProducts(flag) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:{flag:flag},
                url:commonData.BASE_URL + 'productShowAllPro!productShowAll'
            }).success(function (data) {
                if (data['resultcode'] === 1 || data['resultcode'] === '1') {
                    service.products = data['result'];
                    defer.resolve(service.products);
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }

        function getProductDetail(id) {
            var defer = $q.defer();
            $http({
                method:'GET',
                params:{id:id},
                url:commonData.BASE_URL + 'productShowOnePro!productShowOne'
            }).success(function (data) {
                if (parseInt(data['resultcode'], 10) === 1) {
                    service.product = data['result'];
                    defer.resolve(service.product);
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