/**
 * Created by �� on 2015/11/4.
 */
(function () {
    angular.module('myApp', [
        'ui.router',
        'ngAnimate',
        'app.MainOrderInfoController',
        'app.AddressManagementController',
        'app.AddressEditController',
        'app.CouponManagementController',

        'app.services.uiRouter'
    ])
        .config(orderDetailConfig)
        //.run(appRun);

    orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
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
            .state('couponMng', {
                url:'/couponMng',
                templateUrl:'order-detail/coupon-mng.html',
                controller:'CouponManagementController as vm'
            })
    }

    appRun.$inject = ['listenAddressMngRouter'];
    function appRun(listenAddressMngRouter) {
        listenAddressMngRouter.listen();
    }

})();