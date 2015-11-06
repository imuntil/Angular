/**
 * Created by �� on 2015/11/5.
 */
(function () {
    angular.module('app.AddressManagementController', [
        'app.services.addressOperate'
    ])
        .controller('AddressManagementController', AddressManagementController);


    AddressManagementController.$inject = [
        'addressOperate',
        '$state'
    ];
    function AddressManagementController(addressOperate, $state) {
        var vm = this;
        vm.addresses = [];
        vm.chooseAdr = chooseAdr;
        vm.editAddress = editAddress;
        vm.setToDefault = setDefaultAdr;



        active();
        function active() {
            return vm.addresses = addressOperate.addresses;
        }
        function setDefaultAdr($event, index) {
            $event.stopPropagation();

            var _ad = vm.addresses[index];
            return addressOperate.setAdrToDe(_ad.id)
                .then(function () {
                    changeDefaultStatus(index);
                });
        }
        function editAddress($event, index) {
            $event.stopPropagation();
            $state.go('addressEdit',{addressIndex:index});
        }
        function chooseAdr(index) {
            addressOperate.setChosenAdr(vm.addresses[index]);
            window.history.back();
        }
        function changeDefaultStatus(index) {
            angular.forEach(vm.addresses, function (item) {
                item.status = 0;
            });
            vm.addresses[index].status = 1;
        }
    }
})();