/**
 * Created by jtun02 on 15/12/21.
 */
define(
    ['angular', 'localData', 'courseData', 'sanitize'],
    function (angular) {
        "use strict";

        SecondStepController.$inject = ['$stateParams', 'localData', 'CD', 'SRC', '$sce'];
        function SecondStepController($stateParams, localData, CD, SRC, $sce) {
            var vm = this;
            vm.section = $stateParams.section;
            var cd = CD[vm.section - 1];

            active();
            function active() {
                localData.check(vm.section, 2);

                vm.themes = cd['section-2-text'].map(function (item, index) {
                    return $sce.trustAsHtml(item);
                });
                vm.videos = cd['section-2-mov']['mov'].map(function (item, index) {
                    return $sce.trustAsResourceUrl(SRC + 'V/' + item + '.mp4');
                });
                if (cd['section-2-mov']['que'] !== null) {
                    vm.questions = cd['section-2-mov']['que'];
                }
            }
        }

        angular.module('app.controllers.SecondStepController', [
            'app.services.localData',
            'app.services.courseData',
            'ngSanitize'
        ])
            .controller('SecondStepController', SecondStepController);
    }
);