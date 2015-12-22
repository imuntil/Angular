/**
 * Created by jtun02 on 15/12/21.
 */
define(
    ['angular', 'localData', 'courseData', 'sanitize', 'ngDrag', 'choiceQuestion'],
    function (angular) {
        "use strict";

        SecondStepController.$inject = ['$stateParams', 'localData', 'CD', 'SRC', '$sce', '$timeout'];
        function SecondStepController($stateParams, localData, CD, SRC, $sce, $timeout) {
            var vm = this;
            vm.dropComplete = dropComplete;
            vm.onAnswer = onAnswer;
            vm.section = parseInt($stateParams.section, 10);
            var cd = CD[vm.section - 1];
            var test = new Array(4), answers = '1,1,1,1';

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

                var _theme = vm.themes[index];
                if (index === data.id) {
                    _theme.video = data;
                    _theme.class = 'ans-true';
                } else {
                    vm.themes[index].video = undefined;
                    if (_theme.class === 'ans-false') {
                        _theme.class = null;
                        $timeout(function () {
                            _theme.class = 'ans-false';
                        }, 100);
                    } else {
                        _theme.class = 'ans-false';
                    }
                }
                onTest(index, _theme.class === 'ans-true');
            }
            function onAnswer(an, index) {
                onTest(index + 2, an);
            }
            function onTest(index, value) {
                test[index] = +value;
                if (test.join(',') === answers) {
                    console.log('complete');
                    localData.check(vm.section, 3);
                }
            }
        }

        angular.module('app.controllers.SecondStepController', [
            'app.services.localData',
            'app.services.courseData',
            'ngSanitize',
            'ngDraggable',
            'app.directives.choiceQuestion'
        ])
            .controller('SecondStepController', SecondStepController);
    }
);