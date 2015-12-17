/**
 * Created by jtun02 on 15/12/17.
 */
define(
    ['angular', 'localData'],
    function (angular) {

        steps.$inject = ['localData', '$state'];
        function steps(localData, $state) {
            return {
                restrict:'AE',
                scope:{},
                templateUrl:'directives/steps.directive.html',
                transclude:true,
                replace:true,
                link: function (iScope, iEle, iAttr) {

                    var thisCourse = iAttr.thisCourse;

                    iScope.data = localData.fetch();
                    iScope.o = [true, true, true, true];
                    iScope.unlock = false;
                    function refresh() {
                        if (thisCourse <= iScope.data.course) {
                            iScope.unlock = true;
                        }
                        if (thisCourse < iScope.data.course) {
                            return;
                        }
                        var s = iScope.data.step || 1;
                        var _o = iScope.o.map(function (item, index) {
                            if (index + 1 <= s) {
                                return true;
                            }
                            return false;
                        });
                        iScope.o = _o;
                    }
                    iScope.$watch(function () {
                        return iScope.data;
                    }, refresh, true);
                    iScope.go = function (able, step) {
                        if (!able) {return;}
                        $state.go('home.step-' + step, {section:thisCourse});
                    }
                }
            }
        }

        angular.module('app.directives.steps', [
            'app.services.localData'
        ])
            .directive('steps', steps);
    }
);