/**
 * Created by 斌 on 2016/1/19.
 */
(function () {
    "use strict";
    angular.module('app.CustomController', [
        'app.services.availableDates',
        'app.services.addressOperate',
        'app.services.JC',
        'oitozero.ngSweetAlert',
        'app.directives.dateSelect',
        'app.services.http'
    ])
        .controller('CustomController', CustomController)
        .value('tempValue', {
            submit:false
        })
        .factory('tempService', ['$timeout', 'tempValue', function ($timeout, tempValue) {
            return {
                timeLimit: function (time) {
                    if (tempValue.submit) {
                        return;
                    }
                    tempValue.submit = true;
                    $timeout(function () {
                        tempValue.submit = false;
                    }, time);
                }
            }
        }]);

    CustomController.$inject = ['availableDates', 'commonData', 'addressOperate', '$scope', 'tempService', 'tempValue', 'JC', 'SweetAlert'];
    function CustomController(availableDates, commonData, addressOperate, $scope, tempService, tempValue, JC, SweetAlert) {
        var vm = this;
        vm.addresses = [];
        vm.chosenAdr = {};
        vm.class = 'custom';
        vm.products = ['蛋糕', '马卡龙'];
        vm.f = {
            name:vm.products[0],
            count:1,
            requires:''
        };
        vm.tL = tempValue;

        vm.custom = custom;

        active();
        function active() {
            getDates();
            if (commonData.OPENID) {
                getAddresses();
            } else {
                $scope.$on('got:OPENID', function () {
                    getAddresses();
                });
            }
        }

        function getAddresses() {
            addressOperate.getAddresses().then(function (data) {
                vm.addresses = data;
                setDefaultToChosenAdr();
            });
        }

        function setDefaultToChosenAdr() {
            addressOperate.setDefaultToChosenAdr();
            vm.chosenAdr = addressOperate.chosenAdr;
            //watchChosenAdr.watch();
        }

        function getDates() {
            vm.dates = availableDates.dates(7, 12, 'YYYY-MM-DD');
            vm.f.time = vm.dates[0];
        }

        function custom(valid) {
            if (!valid) {
                tempService.timeLimit(1000);
                return;
            }
            JC.custom(angular.extend(vm.f, {'addressid':vm.chosenAdr.id})).then(function () {
                SweetAlert.swal('', '提交完成，我们客服会尽快和您取得联系', 'success');
            }, function () {
                SweetAlert.swal('', 'Error', 'warning');
            });
        }
    }
})();