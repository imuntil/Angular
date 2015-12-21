/**
 * Created by jtun02 on 15/12/21.
 */
define(
    ['angular', 'localData', 'courseData', 'sanitize', 'ngDrag'],
    function (angular) {
        "use strict";

        SecondStepController.$inject = ['$stateParams', 'localData', 'CD', 'SRC', '$sce'];
        function SecondStepController($stateParams, localData, CD, SRC, $sce) {
            var vm = this;
            vm.dropComplete = dropComplete;
            vm.section = parseInt($stateParams.section, 10);
            var cd = CD[vm.section - 1];

            active();
            function active() {
                localData.check(vm.section, 2);

                var ans = cd['section-2-ids'];
                vm.themes = cd['section-2-text'].map(function (item, index) {
                    return {title: $sce.trustAsHtml(item)};
                });
                vm.videos = cd['section-2-mov']['mov'].map(function (item, index) {
                    return {
                        src:$sce.trustAsResourceUrl(SRC + 'V/' + item + '.mp4'),
                        id:ans[index] - 1
                    };
                });
                if (cd['section-2-mov']['que'] !== null) {
                    vm.questions = cd['section-2-mov']['que'];
                }
            }
            function dropComplete(data, index, event) {
                console.log(data);
                console.log(index);

                if (index === data.id) {
                    vm.themes[index].video = data;
                }
            }
        }

        angular.module('app.controllers.SecondStepController', [
            'app.services.localData',
            'app.services.courseData',
            'ngSanitize',
            'ngDraggable'
        ])
            .controller('SecondStepController', SecondStepController);
    }
);