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
        '$stateParams',
        'addressOperate',
        'orderInfo',
        'availableDates',
        'couponsAbout'
    ];
    function MainOrderInfoController($stateParams, addressOperate, orderInfo, availableDates, couponsAbout) {
        var vm = this;
        vm.addresses = [];
        vm.chosenAdr = {};
        vm.class = 'main';
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
        }
        function getDates() {
            vm.dates = availableDates.dates(4, 9);
        }
    }
})();