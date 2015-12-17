/**
 * Created by jtun02 on 15/12/17.
 */
define(
    ['angular', 'localData', 'hVideo'],
    function (angular) {
        "use strict";

        FirstStepController.$inject = ['localData', '$stateParams', '$scope'];
        function FirstStepController(localData, $stateParams, $scope) {
            var vm = this;
            vm.playEnd = playEnd;
            vm.section = parseInt($stateParams.section, 10);
            vm.src = 'http://api.jtuntech.com/event/2015/landrover/assets/V/v-0' + vm.section + '.mp4';

            updateLocal(1);
            function playEnd() {
                console.log('end');
                updateLocal(2);
            }
            function updateLocal(step) {
                localData.check(vm.section, step);
            }

        }
        angular.module('app.controllers.FirstStepController', [
            'app.services.localData',
            'app.directives.hVideo'
        ])
            .controller('FirstStepController', FirstStepController);
    }
);