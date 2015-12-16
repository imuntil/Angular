/**
 * Created by jtun02 on 15/12/14.
 */
(function () {
    angular.module('iu.directives.stopwatch', [])
        .directive('stopwatch', stopwatch);

    stopwatch.$inject = ['$interval'];
    function stopwatch($interval) {

        return {
            restrict:'EA',
            template:'<b>{{H}}</b>H<b>{{M}}</b>M<b>{{S}}</b>S',
            link: function (iScope, iEle, iAttrs) {
                var EDNDATE = iAttrs.stopwatch;

                function compute() {
                    var now = new Date();
                    var ms = EDNDATE - now;
                    iScope.H = parseInt(ms / 3600000);
                    ms = ms % 3600000;
                    var m = parseInt(ms / 60000);
                    iScope.M = m > 9 ? m : '0' + m;
                    ms = ms % 60000;
                    var s = parseInt(ms / 1000);
                    iScope.S = s > 9 ? s : '0' + s;
                }

                $interval(compute, 1000);

                compute();
            }
        }
    }
})();