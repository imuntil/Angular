/**
 * Created by jtun02 on 15/12/17.
 */
define(
    ['angular', 'localData', 'hVideo', 'courseData'],
    function (angular) {
        "use strict";

        FirstStepController.$inject = ['localData', '$stateParams', 'CD'];
        function FirstStepController(localData, $stateParams, CD) {
            var vm = this;
            vm.playEnd = playEnd;
            vm.section = parseInt($stateParams.section, 10);

            active();
            function playEnd() {
                console.log('end');
                updateLocal(2);
            }
            function updateLocal(step) {
                localData.check(vm.section, step);
            }
            function active() {
                updateLocal(1);
                var cd = CD[vm.section - 1];
                vm.src = 'http://api.jtuntech.com/event/2015/landrover/assets/V/' + cd['section-1'] + '.mp4';
            }

        }
        angular.module('app.controllers.FirstStepController', [
            'app.services.localData',
            'app.services.courseData',
            'app.directives.hVideo'
        ])
            .controller('FirstStepController', FirstStepController);
    }
);