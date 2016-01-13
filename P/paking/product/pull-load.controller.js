/**
 * Created by �� on 2015/11/10.
 */
(function () {
    angular.module('app.PullLoadController', [
        'app.services.productsAbout',
        'app.services.pagination',

        'app.directives.pullLoad'
    ])
        .controller('PullLoadController', PullLoadController);

    PullLoadController.$inject = ['productsAbout', 'pagination', '$window', '$location'];
    function PullLoadController(productsAbout, pagination, $window, $location) {
        /*jshint validthis: true */
        var vm = this;
        vm.class = 'products';
        vm.flag = 0;
        vm.itemsPerPage = 8;
        vm.loadItems = loadItems;
        vm.loadMore = loadMore;
        vm.pagingItems = [];
        vm.viewingItems = [];

        console.log($location.path());
        loadItems(2);
        function loadItems(flag) {
            if (vm.flag === flag) {return;}
            vm.flag = flag;
            vm.currentPage = 0;
            productsAbout.getProducts(flag)
                .then(function (data) {
                    vm.pagingItems = pagination.paging(data, vm.itemsPerPage);
                    if (vm.pagingItems && vm.pagingItems.length > 0) {
                        vm.viewingItems = vm.pagingItems[0];
                    }
                });
        }

        function loadMore() {
            vm.currentPage += 1;
            var load = vm.pagingItems[vm.currentPage];
            if (load && load.length > 0) {
                vm.viewingItems = vm.viewingItems.concat(load);
            } else {
                $window.alert('没有更多了');
            }
        }
    }
})();