/**
 * Created by ±ó on 2015/11/4.
 */
(function () {
    angular.module('myApp', ['ui.router'])
        .config(orderDetailConfig);

    orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function orderDetailConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/order/10/3');
        $stateProvider
            .state('order', {
                url:'/order/:pid/:pnum',
                template:'<h1>test</h1>',
                controller: function ($stateParams) {
                    console.log($stateParams);
                }
            })
    }

})();