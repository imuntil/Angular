/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    (function () {
        angular.module('myApp', [
            'ui.router',
            'ngAnimate',

            //'app.ProductsController',
            'app.PullLoadController',
            'app.ProductDetailController',

            'app.MainOrderInfoController',
            'app.AddressManagementController',
            'app.AddressEditController',
            'app.CouponManagementController',
            'app.ErrorController',

            'app.services.uiRouter',
            'app.services.wechatRelated',
            'app.services.http'
        ])
            .config(orderDetailConfig)
            .run(appRun);

        orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
        function orderDetailConfig($stateProvider, $urlRouterProvider,$locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');
            $urlRouterProvider.otherwise('/products');
            $stateProvider
                .state('products', {
                    url:'/products',
                    //templateUrl:'product/products.html',
                    //controller:'ProductsController as vm'
                    templateUrl:'product/pull-load.html',
                    controller:'PullLoadController as vm'
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
                .state('error', {
                    url:'/error',
                    templateUrl:'order-detail/error.html',
                    controller:'ErrorController as vm'
                });
        }

        appRun.$inject = ['listenAddressMngRouter', 'userAuthorization', 'commonData', 'wechatConfig'];
        function appRun(listenAddressMngRouter, userAuthorization, commonData, wechatConfig) {
            userAuthorization.start().then(function (data) {
                commonData.OPENID = data.userNick;
            });
            listenAddressMngRouter.listen();
            wechatConfig.addApiList(['chooseWXPay']);
            wechatConfig.setConfig(true);
        }

    })();
})();