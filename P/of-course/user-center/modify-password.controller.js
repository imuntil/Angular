/**
 * Created by 斌 on 2016/12/16.
 */
(function () {
    "use strict";

    angular.module('oc.ModifyController', [
        'oc.services.dialogLayer',
        'oc.services.userAction'
    ])
        .controller('ModifyController', ModifyController);

    ModifyController.$inject = ['DialogLayer', '$timeout', 'userAction'];
    function ModifyController(DialogLayer, $timeout, userAction) {
        var vm = this;
        vm.submit = false;
        vm.modify = modify;
        vm.shake = false;


        function modify(valid) {
            vm.submit = true;

            if (!valid || vm.new === vm.old || vm.new !== vm.reNew) {
                vm.shake = true;
                $timeout(function () {
                    vm.shake = false;
                }, 500);
            } else {
                userAction.modify(vm.old, vm.new)
                    .then(function (response) {

                    }, function (response) {
                        DialogLayer.openTimed('网络故障，请稍后重试！');
                    });
            }
        }
    }
})();