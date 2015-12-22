/**
 * Created by jtun02 on 15/12/21.
 */
define(
    ['angular', 'localData', 'courseData'],
    function (angular) {
        "use strict";

        FourthStepController.$inject = ['$stateParams', 'localData', 'CD'];
        function FourthStepController($stateParams, localData, CD) {
            var vm = this;
            vm.assessSelf = assessSelf;
            vm.ops = ['first', 'second', 'third', 'forth', 'fifth'];
            vm.section = parseInt($stateParams.section, 10);
            vm.ar = [-1, -1, -1, -1];

            active();
            function active() {
                localData.check(vm.section, 4);
                vm.assess = CD[vm.section - 1]['section-4'];
            }
            function assessSelf(index, _index) {
                vm.ar[index] = _index;
                var complete = vm.ar.every(function (item) {
                    return item > -1;
                });
                if (complete) {
                    localData.check(vm.section + 1, 1);
                }
            }
        }
        angular.module('app.controllers.FourthStepController', [
            'app.services.localData',
            'app.services.courseData'
        ])
            .controller('FourthStepController', FourthStepController);
    }
);