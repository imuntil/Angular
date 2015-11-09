/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    (function () {
        angular.module('myApp', [
            'ui.router',
            'ngAnimate',

            'app.ProductsController',
            'app.ProductDetailController',

            'app.MainOrderInfoController',
            'app.AddressManagementController',
            'app.AddressEditController',
            'app.CouponManagementController',

            'app.services.uiRouter'
        ])
            .config(orderDetailConfig)
            .run(appRun);

        orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
        function orderDetailConfig($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/products');
            $stateProvider
                .state('products', {
                    url:'/products',
                    templateUrl:'product/products.html',
                    controller:'ProductsController as vm'
                })
                .state('product', {
                    url:'/product/:index/:id',
                    templateUrl:'product/product-detail.html',
                    controller:'ProductDetailController as vm'
                })
                .state('order', {
                    url:'/order',
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
})();