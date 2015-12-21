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
            vm.section = parseInt($stateParams.section, 10);

            active();
            function active() {
                localData.check(vm.section, 4);
                vm.assess = CD[vm.section - 1]['section-4'];
            }
        }
        angular.module('app.controllers.FourthStepController', [
            'app.services.localData',
            'app.services.courseData'
        ])
            .controller('FourthStepController', FourthStepController);
    }
);