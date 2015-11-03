/**
 * Created by jtun02 on 15/11/3.
 */
(function () {
    angular.module('myApp', [])
        .constant('baseURL', {
            BASE_URL: 'http://m.jtuntech.com/Baking/'
        })
        .factory('getProductInfo', getProductInfo)
        .service('swiperService', swiperService)
        .controller('ProductController', ProductController);

    ProductController.$inject = ['$scope', 'getProductInfo', 'swiperService', '$timeout'];
    function ProductController($scope, getProductInfo, swiperService, $timeout) {
        /* jshint validthis: true */
        var vm = this;
        vm.count = 1;
        vm.currentImg = 1;
        vm.infos = {};
        vm.labels = [];
        vm.selectGoods = selectGoods;
        vm.totalImgs = 0;
        vm.totalPrice = 0;

        getInfos();
        function getInfos() {
            return getProductInfo.query(22).success(function (data) {
                if (data.resultcode != 1) return;
                vm.infos = data.result;
                vm.labels = typeof vm.infos.prolabel === 'string'
                    ? vm.infos.prolabel.split('.')
                    : vm.infos.prolabel;

                vm.totalImgs = typeof vm.infos.proimg === 'string'
                    ? vm.infos.proimg.split(',')
                    : vm.infos.proimg;

                vm.totalPrice = vm.infos.proprice;

                $timeout(function () {
                    vm.swiper = swiperService.swiper();
                }, 500, false);

            });
        }
        function selectGoods(type) {
            if (type === '-') {
                vm.count = vm.count - 1 > 0 ? vm.count - 1 : 1
            } else {
                vm.count += 1;
            }
            vm.totalPrice = vm.count * vm.infos.proprice;
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


    swiperService.$inject = ['$rootScope'];
    function swiperService($rootScope) {
        this.swiper = function () {
            new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                preloadImages: true,
                loop: true,
                onSlideChangeEnd: function (swiper) {

                }
            });
        }
    }
})();