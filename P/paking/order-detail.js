/**
 * Created by �� on 2015/11/4.
 */
(function () {
    angular.module('myApp', [
        'ui.router',
        'app.MainOrderInfoController',
        'app.AddressManagementController',
        'app.AddressEditController'
    ])
        .config(orderDetailConfig);

    orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function orderDetailConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/order/9/3');
        $stateProvider
            .state('order', {
                url:'/order/:pid/:pnum',
                templateUrl:'order-detail/main-order-info.html',
                controller:'MainOrderInfoController as vm'
            })
            .state('addressMng', {
                url:'/addressMng',
                templateUrl:'order-detail/address-mng.html',
                controller:'AddressManagementController as vm'
            })
            .state('addressEdit', {
                url:'/addressEdit/:addressIndex',
                templateUrl:'order-detail/address-edit.html',
                controller:'AddressEditController as vm'
            })
    }

})();