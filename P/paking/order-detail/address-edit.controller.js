/**
 * Created by jtun02 on 15/11/6.
 */
(function () {
    angular.module('app.AddressEditController', [
        'app.services.addressOperate',
        'app.services.http',
        'app.directives.phoneNumberValidate',
        'app.directives.blurValidate'
    ])
        .controller('AddressEditController', AddressEditController);

    AddressEditController.$inject = [
        '$stateParams',
        'commonData',
        'addressOperate',
        '$location'
    ];
    function AddressEditController($stateParams, commonData, addressOperate, $location) {
        var vm = this;
        vm.addressIndex = $stateParams.addressIndex || undefined;
        vm.addresses = [];
        vm.cancelEdit = cancelEdit;
        vm.class = 'edit';
        vm.deleteAddress = deleteAddress;
        vm.editingAdr = {};
        vm.saveAddress = saveAddress;

        active();
        function active() {
            vm.addresses = addressOperate.addresses;
            if (vm.addressIndex !== undefined) {
                vm.editingAdr = vm.addresses[vm.addressIndex];
                if (vm.editingAdr === undefined) {
                    $location.url('/error').replace();
                }
            }
        }
        function saveAddress(invalid) {
            if (invalid) { return; }
            if (vm.addressIndex === undefined) {
                addAddress();
            } else {
                updateAddress();
            }
        }

        function cancelEdit() {
            window.history.back();
        }

        function deleteAddress() {
            var _id = vm.addresses[vm.addressIndex].id;
            addressOperate.deleteAddress(_id)
                .then(function () {
                    window.history.back();
                });
        }

        function addAddress() {
            var param = angular.extend({usersid:commonData.OPENID}, vm.editingAdr);
            addressOperate.addAddress(param)
                .then(function () {
                    window.history.back();
                });
        }

        function updateAddress() {
            var param = {
                id     :vm.editingAdr.id,
                name   :vm.editingAdr.name,
                phone  :vm.editingAdr.phone,
                city   :vm.editingAdr.city,
                address:vm.editingAdr.address,
                label  :vm.editingAdr.label
            };
            addressOperate.updateAddress(param)
                .then(function () {
                    window.history.back();
                });
        }


    }
})();