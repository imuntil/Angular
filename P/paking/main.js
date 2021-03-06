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
        /*jshint validthis: true */
        var vm = this;
        vm.flag = 2;
        vm.loadItems = loadItems;
        vm.loadMore = loadMore;
        vm.pagingItems = [];
        vm.viewingItems = [];

        loadItems(2);
        function loadItems(flag) {
            vm.flag = flag;
            vm.currentPage = 0;
            getItems.query(flag).success(function (data) {
                if (data.resultcode == 1) {
                    vm.pagingItems = pagination(data.result, 8);
                    if (vm.pagingItems && vm.pagingItems.length > 0) {
                        vm.viewingItems = vm.pagingItems[0];
                    }
                }
            });
        }

         function loadMore() {
            console.log('loadmore');
            vm.currentPage += 1;
            var load = vm.pagingItems[vm.currentPage];
            console.log(load);
            if (load && load.length > 0) {
                vm.viewingItems = vm.viewingItems.concat(load);
                console.log(vm.viewingItems);
            }
        }
    }
    function getItems($http) {
        var items = {
            query: query
        };
        return items;

        function query(flag) {
            return $http({
                method:'GET',
                params:{flag:flag},
                url:'http://m.jtuntech.com/Baking/productShowAllPro!productShowAll'
            });
        }
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
                if (child.length === 0) break;
            }
            return result;
        };
    }
})();