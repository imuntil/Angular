/**
 * Created by jtun02 on 16/1/20.
 */
(function () {
    "use strict";
    angular.module('app.directives.timeLimit', [

    ])
        .directive('timeLimit', timeLimit);

    timeLimit.$inject = ['$timeout'];
    function timeLimit($timeout) {
        return {
            restrict:'A',
            scope:{
                variable:'=iuVariable'
            },
            link: function (iScope, iEle, iAttrs) {
                var time  = 1000;
                if (angular.isDefined(iAttrs.timeLimit)) {
                    time = parseInt(iAttrs.timeLimit, 10) || 1000;
                }
                console.log(iScope.variable);
                console.log(time);
                $timeout(function () {
                    iScope.variable = !iScope.variable;
                }, time);
            }
        }
    }
})();