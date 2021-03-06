/**
 * Created by jtun02 on 15/11/9.
 */
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

        'app.UserInfoController',
        'app.UserOrderController',
        'app.UserAssetsController',

        'app.JoinController',
        'app.CustomController',

        'app.services.uiRouter',
        'app.services.wechatRelated',
        'app.services.http'
    ])
        .config(orderDetailConfig)
        .run(appRun);

    orderDetailConfig.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
    function orderDetailConfig($stateProvider, $urlRouterProvider,$locationProvider) {
        //$locationProvider.html5Mode(true).hashPrefix('!');
        //$urlRouterProvider.otherwise('/products');
        $urlRouterProvider.otherwise('/userInfo');
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
            })
            .state('userInfo', {
                url:'/userInfo',
                templateUrl:'user-center/user-info.html',
                controller:'UserInfoController as vm'
            })
            .state('userOrder', {
                url:'/userOrder',
                templateUrl:'user-center/user-order.html',
                controller:'UserOrderController as vm'
            })
            .state('userAssets', {
                url:'/assets/:status',
                templateUrl:'user-center/user-assets.html',
                controller:'UserAssetsController as vm'
            })
            .state('join', {
                url:'/join',
                templateUrl:'join&custom/join.html',
                controller:'JoinController as vm'
            })
            .state('custom', {
                url:'/custom',
                templateUrl:'join&custom/custom.html',
                controller:'CustomController as vm'
            });
    }

    appRun.$inject = ['listenAddressMngRouter', 'userAuthorization', 'commonData', 'wechatConfig', '$rootScope'];
    function appRun(listenAddressMngRouter, userAuthorization, commonData, wechatConfig, $rootScope) {
        userAuthorization.start().then(function (data) {
            console.log('start');
            commonData.OPENID = data.openId;
            $rootScope.$broadcast('got:OPENID');
        });
        listenAddressMngRouter.listen();
        wechatConfig.addApiList(['chooseWXPay']);
        wechatConfig.setConfig(true);
    }

})();