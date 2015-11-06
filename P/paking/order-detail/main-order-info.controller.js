/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.MainOrderInfoController', [
        'app.directives.dateSelect',
        'app.services.addressOperate',
        'app.services.order-info',
        'app.services.availableDates'
    ])
        .controller('MainOrderInfoController', MainOrderInfoController);

    MainOrderInfoController.$inject = [
        '$stateParams',
        'addressOperate',
        'orderInfo',
        'availableDates'
    ];
    function MainOrderInfoController($stateParams, addressOperate, orderInfo, availableDates) {
        var vm = this;
        vm.addresses = [];
        vm.chosenAdr = {};
        vm.oi = {};
        vm.dates = [];

        //console.log($stateParams);

        active();
        orderInit();
        getDates();
        function active() {
            return addressOperate.getAddresses().then(function (data) {
                vm.addresses = addressOperate.addresses = data['result'];
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