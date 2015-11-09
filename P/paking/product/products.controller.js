/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    angular.module('app.ProductsController', [
        'app.services.productsAbout',
        'app.services.pagination',
        'infinite-scroll'
    ])
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['productsAbout', 'pagination'];
    function ProductsController(productsAbout, pagination) {
        /*jshint validthis: true */
        var vm = this;
        vm.class = 'products';
        vm.flag = 2;
        vm.loadItems = loadItems;
        vm.loadMore = loadMore;
        vm.pagingItems = [];
        vm.viewingItems = [];

        loadItems(2);
        function loadItems(flag) {
            vm.flag = flag;
            vm.currentPage = 0;
            productsAbout.getProducts(flag)
                .then(function (data) {
                    vm.pagingItems = pagination.paging(data, 8);
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
            }
        }
    }
})();