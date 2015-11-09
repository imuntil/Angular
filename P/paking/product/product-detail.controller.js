/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    angular.module('app.ProductDetailController', [
        'app.services.productsAbout',
        'app.services.swiperTools',
        'app.services.order-info'
    ])
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = [
        '$stateParams',
        'productsAbout',
        'swiperTools',
        '$timeout',
        '$state',
        'orderInfo'
    ];
    function ProductDetailController($stateParams, productsAbout, swiperTools, $timeout, $state, orderInfo) {
        var vm = this;
        vm.class = 'product';
        vm.count = 1;
        vm.generateOrder = generateOrder;
        vm.infos = {};
        vm.labels = [];
        vm.selectGoods = selectGoods;
        vm.swiper = swiperTools;
        vm.totalImgs = 0;

        active();
        function active() {
            getProductInfo();
            getPrevOrderInfo();
        }

        /**
         * 获取商品信息
         */
        function getProductInfo() {
            var _infos = productsAbout.products;
            if (_infos && _infos.length > 0) {
                vm.infos = _infos[$stateParams.index];
                initDatas();
            } else {
                productsAbout.getProductDetail($stateParams.id)
                    .then(function (data) {
                        vm.infos = data;
                        initDatas();
                    });
            }
        }

        /**
         * 获取上次的订单信息。如果有.
         */
        function getPrevOrderInfo() {
            var prevOi = orderInfo.info;
            if (prevOi && prevOi.pid !== undefined && prevOi.pid === $stateParams.id) {
                vm.count = prevOi.pcount;
            }
        }
        function initDatas() {
            vm.labels = typeof vm.infos.prolabel === 'string'
                ? vm.infos.prolabel.split(',')
                : vm.infos.prolabel;

            vm.totalImgs = typeof vm.infos.proimg === 'string'
                ? vm.infos.proimg.split(',')
                : vm.infos.proimg;

            $timeout(function () {
                vm.swiper.swiper(vm.totalImgs.length);
            }, 500);
        }
        function selectGoods(type) {
            if (type === '-') {
                vm.count = vm.count - 1 > 0 ? vm.count - 1 : 1
            } else {
                vm.count += 1;
            }
        }
        function generateOrder() {
            orderInfo.generateOrder({
                pid:$stateParams.id,
                pcount:vm.count,
                pname:vm.infos.proname,
                pprice:vm.infos.proprice,
                ptotal:vm.infos.proprice * vm.count
            });
            $state.go('order');
        }
    }
})();