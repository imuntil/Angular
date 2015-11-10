/**
 * Created by ±ó on 2015/11/10.
 */
(function () {
    angular.module('app.directives.pullLoad', [])
        .directive('pullLoad', pullLoad)
        .controller('PullLoadController', PullLoadController)
        .directive('pullLoadItem', pullLoadItem);

    function pullLoad() {

        return {
            restrict:'EA',
            transclude:true,
            templateUrl:'directives/pull-load.directive.html',
            replace:true,
            scope:{
                
            },
            controller:'PullLoadController',
            link: function (iScope, iEle, iAttrs) {

            }
        }
    }

    PullLoadController.$inject = ['$scope'];
    function PullLoadController($scope) {

    }

    function pullLoadItem() {
        return {
            restrict:'EA',
            templateUrl:'directives/pull-load-item.directive.html',
            replace:true,
            require:'^pullLoad',
            scope:{
                proName:'@',
                proImgSrc:'@',
                headImgSrc:'@'
            },
            link: function (iScope, iEle, iAttrs, pullLoadCtrl) {

            }
        }
    }
})();