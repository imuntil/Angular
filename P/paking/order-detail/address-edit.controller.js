/**
 * Created by jtun02 on 15/11/6.
 */
(function () {
    angular.module('app.AddressEditController', [
        'app.services.addressOperate',
        'app.directives.phoneNumberValid'
    ])
        .controller('AddressEditController', AddressEditController);

    AddressEditController.$inject = [
        '$stateParams',
        'addressOperate'
    ];
    function AddressEditController($stateParams, addressOperate) {
        var vm = this;
        vm.addressIndex = $stateParams.addressIndex || undefined;
        vm.addresses = [];
        vm.editingAdr = {};
        vm.saveAddress = saveAddress;

        active();
        function active() {
            vm.addresses = addressOperate.addresses;
            if (vm.addressIndex !== undefined) {
                vm.editingAdr = vm.addresses[vm.addressIndex];
            }
        }
        function saveAddress(invalid) {
            if (invalid) { return; }
        }
    }
})();