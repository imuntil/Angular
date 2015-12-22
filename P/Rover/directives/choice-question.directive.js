/**
 * Created by jtun02 on 15/12/22.
 */
define(
    ['angular'],
    function (angular) {
        "use strict";

        function choiceQuestion() {
            return {
                restrict:'A',
                templateUrl:'directives/choice-question.directive.html',
                scope:{
                    cq:'=choiceQuestion',
                    onAnswer:'&'
                },
                link: function (iScope, iEle, iAttrs) {
                    //iEle.find('a').bind('click', function () {
                    //    angular.element(this).toggleClass('q-active');
                    //});
                    var a = iScope.cq.ans, b = [-1, -1, -1, -1];
                    [].forEach.call(iEle.find('a'), function (e, i) {
                        var ae = angular.element(e);
                        ae.bind('click', function () {
                            ae.toggleClass('q-active');
                            b[i] = ae.hasClass('q-active') ? 1 : -1;
                            answering();
                        });
                    });

                    function answering() {
                        var an = a.join(',') === b.join(',');
                        iScope.$apply(function () {
                            iScope.onAnswer({an:an});
                        });
                    }
                }
            }
        }
        angular.module('app.directives.choiceQuestion', [])
            .directive('choiceQuestion', choiceQuestion);
    }
);