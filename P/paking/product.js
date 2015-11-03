/**
 * Created by jtun02 on 15/11/3.
 */
(function () {
    angular.module('myApp', [])
        .constant('baseURL', {
            BASE_URL: 'http://m.jtuntech.com/Baking/'
        })
        .factory('getProductInfo', getProductInfo)
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$scope', 'getProductInfo'];
    function ProductController($scope, getProductInfo) {
        /* jshint validthis: true */
        var vm = this;


        var getInfos = function () {
            return getProductInfo.then(function (data) {
                if (data.resultcode != 1) return;
            })
        }
    }

    getProductInfo.$inject = ['baseURL', '$http'];
    function getProductInfo(baseURL, $http) {
        var service = {
            query:query
        };
        return service;

        function query(productID) {
            return $http({
                method:'GET',
                params:{id: productID},
                url:baseURL.BASE_URL + 'productShowOnePro!productShowOne'
            });
        }
    }
})();