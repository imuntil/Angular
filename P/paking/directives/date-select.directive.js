/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.directives.module', [])
        .directive('dateSelect', dateSelect);

    function dateSelect() {
        return {
            restrict:'AE',
            templateUrl:'directives/date-select.directive.html',
            //template:'<div>dates</div>',
            replace:true,
            scope:{
                dates:'@'
            },
            link: function (scope, element, attrs) {

            }
        }
    }
})();