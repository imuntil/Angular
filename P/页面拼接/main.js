/**
 * Created by jtun02 on 15/10/26.
 */
(function () {
    angular
        .module('myApp', ['infinite-scroll'])
        .controller('TestController', TestController)
        .factory('getItems', getItems)
        .factory('pagination', pagination);

    TestController.$inject = ['$scope', 'getItems', 'pagination'];
    getItems.$inject = ['$http'];

    function TestController($scope, getItems, pagination) {
        $scope.pagingItems = [];
        $scope.viewingItems = [];
        $scope.flag = 2;

        $scope.loadItems = function (flag) {
            $scope.flag = flag;
            $scope.currentPage = 0;
            getItems.query(flag).success(function (data) {
                if (data.resultcode == 1) {
                    $scope.pagingItems = pagination(data.result, 8);
                    if ($scope.pagingItems && $scope.pagingItems.length > 0) {
                        $scope.viewingItems = $scope.pagingItems[0];
                    }
                }
            });
        };

        $scope.loadMore = function () {
            console.log('loadmore');
            $scope.currentPage += 1;
            var load = $scope.pagingItems[$scope.currentPage];
            console.log(load);
            if (load && load.length > 0) {
                $scope.viewingItems = $scope.viewingItems.concat(load);
                console.log($scope.viewingItems);
            }
        };

        $scope.loadItems(2);
    }
    function getItems($http) {
        var items = {};
        items.query = function (flag) {
            return $http({
                method:'GET',
                params:{flag:flag},
                url:'http://m.jtuntech.com/Baking/productShowAllPro!productShowAll'
            });
        };
        return items;
    }
    function pagination() {

        return function (arr, count) {
            var result = [],
                i, len = arr.length,
                num = Math.ceil(len / count);

            for (i = 0; i < num; i ++) {
                var child = [];
                var next = i + 1;
                if (next * count < len) {
                    child = arr.slice(i * count, next * count);
                } else {
                    child = arr.slice(i * count, arr.length);
                }
                result.push(child);
                if (child.length == 0) break;
            }
            return result;
        }
    }
})();