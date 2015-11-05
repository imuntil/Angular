/**
 * Created by �� on 2015/11/4.
 */
(function () {
    angular.module('myApp.order-detail', ['ui.router'])
        .config(orderDetailConfig);

    orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function orderDetailConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/order/10/3');
        $stateProvider
            .state('order', {
                url:'/order/:pid/:pnum',
                templateUrl:'order-detail/main-order-info.html',
                controller:'MainOrderInfoController as vm'
            });
    }

})();