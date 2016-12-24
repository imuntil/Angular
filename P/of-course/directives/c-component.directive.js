/**
 * Created by 斌 on 2016/12/7.
 */
angular.module('oc.directives.component', [

])
    .directive('cHeader', cHeader)
    .directive('cFooter', cFooter);

function cFooter() {
    return {
        restrict:'E',
        replace:true,
        templateUrl:'directives/c-footer.directive.html',
        link: function () {

        }
    }
}

function cHeader() {
    return {
        restrict:'E',
        replace:true,
        templateUrl:'directives/c-header.directive.html',
        scope:{
            current:'='
        },
        link: function () {

        }
    }
}
