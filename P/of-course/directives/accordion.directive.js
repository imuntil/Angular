/**
 * Created by 斌 on 2016/12/12.
 */
(function () {
    "use strict";
    angular.module('app.directives.accordion', [

    ])
        .directive('accordion', accordion)
        .directive('expander', expander)
        .directive('inner', inner);

    function accordion() {
        return {
            restrict:'AE',
            replace: true,
            transclude: true,
            template: '<div ng-transclude class="p-course"></div>',
            link : function () {
                console.log('according');
            }
        }
    }

    function expander() {
        return {
            restrict:'AE',
            replace:true,
            transclude:true,
            template:'<div>' +
                     '<b>{{expander.chapter}}</b>' +
                     '<div ng-transclude class="no-border"></div>' +
                     '</div>',
            scope:{
                expander:'=ep'
            },
            link: function () {
                console.log('expander');
            }
        }
    }
    inner.$inject = ['$rootScope'];
    function inner($rootScope) {
        return {
            restrict:'AE',
            replace:true,
            templateUrl:'directives/inner.directive.html',
            link: function (iScope, iEle, iAttrs, parentController) {
                console.log('inner');
                iScope.showMe = false;
                iScope.toggle = function () {
                    iScope.showMe = !iScope.showMe;
                }
            }
        }
    }
})();