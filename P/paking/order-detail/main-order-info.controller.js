/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.MainOrderInfoController', [
        'app.directives.dateSelect',
        'app.services.addressOperate',
        'app.services.order-info',
        'app.services.availableDates',
        'app.services.couponsAbout',
        'app.services.generateOrder'
    ])
        .controller('MainOrderInfoController', MainOrderInfoController);

    MainOrderInfoController.$inject = [
        '$location',
        'addressOperate',
        'orderInfo',
        'availableDates',
        'couponsAbout',
        'watchChosenAdr',
        'generateOrder'
    ];
    function MainOrderInfoController($location, addressOperate, orderInfo, availableDates, couponsAbout, watchChosenAdr, generateOrder) {
        var vm = this;
        vm.addresses = [];
        vm.chosenAdr = {};
        vm.class = 'main';
        vm.coupon = {};
        vm.oi = {};
        vm.dates = [];
        vm.submitOrder = submitOrder;

        //console.log($stateParams);

        active();
        orderInit();
        getDates();
        function active() {
            return addressOperate.getAddresses().then(function (data) {
                vm.addresses = data;
                setDefaultToChosenAdr();
            });
        }

        function setDefaultToChosenAdr() {
            addressOperate.setDefaultToChosenAdr();
            vm.chosenAdr = addressOperate.chosenAdr;
            watchChosenAdr.watch();
        }

        function orderInit() {
            orderInfo.watchInfo();
            vm.oi = orderInfo.info;

            if (vm.oi.pid === undefined) {
                $location.url('/error');
                $location.replace();
            }

            vm.coupon = orderInfo.coupon;
        }
        function getDates() {
            vm.dates = availableDates.dates(4, 9);
            vm.date = vm.dates[0];
        }

        function submitOrder() {
            vm.oi.odate = vm.date;

            var po = generateOrder.GO()
                .then(function (data) {
                    return data;
                });
            var pp = po.then(function (data) {
                generateOrder.pay(data)
                    .then(function (res) {
                        return res;
                    });
            });

            if (orderInfo.coupon.id) {
                pp.then(function (res) {
                    couponsAbout.useCoupon(orderInfo.coupon.id)
                        .then(function () {
                            console.log('订单支付完成');
                        });
                });
            } else {
                console.log('订单支付完成');
            }
        }
    }
})();