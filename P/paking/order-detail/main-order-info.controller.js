/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.controller.module', [
        'http.services',
        'order-info.services',
        'app.directives.module',
        'app.services.module'
    ])
        .controller('MainOrderInfoController', MainOrderInfoController);

    MainOrderInfoController.$inject = [
        '$stateParams',
        'getAddressesData',
        'orderInfo',
        'availableDates'
    ];
    function MainOrderInfoController($stateParams, getAddressesData, orderInfo, availableDates) {
        var vm = this;
        vm.addresses = [];
        vm.defaultAddress = {};
        vm.oi = {};
        vm.dates = [];

        //console.log($stateParams);

        active();
        orderInit();
        getDates();
        function active() {
            return getAddressesData.getAddresses().then(function (data) {
                vm.addresses = getAddressesData.addresses = data['result'];
                setDefaultAddress();
            });
        }
        function setDefaultAddress() {
            vm.defaultAddress = vm.addresses[0];
            for (var i = 0; i < vm.addresses.length; i++) {
                var va = vm.addresses[i];
                if (va.status === 1) {
                    vm.defaultAddress = va;
                    break;
                }
            }
        }
        function orderInit() {
            orderInfo.watchInfo();
            vm.oi = orderInfo.info;
        }
        function getDates() {
            vm.dates = availableDates.dates(4, 9);
        }
    }
})();