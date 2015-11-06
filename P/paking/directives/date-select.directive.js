/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.directives.dateSelect', [])
        .directive('dateSelect', dateSelect);

    function dateSelect() {
        return {
            restrict:'AE',
            templateUrl:'directives/date-select.directive.html',
            replace:true,
            scope:{
                dates:'='
            }
        }
    }
})();