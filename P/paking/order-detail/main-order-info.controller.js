/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.MainOrderInfoController', [
        'app.directives.dateSelect',
        'app.services.addressOperate',
        'app.services.order-info',
        'app.services.availableDates',
        'app.services.couponsAbout'
    ])
        .controller('MainOrderInfoController', MainOrderInfoController);

    MainOrderInfoController.$inject = [
        '$location',
        'addressOperate',
        'orderInfo',
        'availableDates',
        'couponsAbout'
    ];
    function MainOrderInfoController($location, addressOperate, orderInfo, availableDates, couponsAbout) {
        var vm = this;
        vm.addresses = [];
        vm.chosenAdr = {};
        vm.class = 'main';
        vm.coupon = {};
        vm.oi = {};
        vm.dates = [];

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
        }
    }
})();