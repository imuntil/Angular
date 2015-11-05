/**
 * Created by �� on 2015/11/4.
 */
(function () {
    angular.module('myApp', [
        'ui.router',
        'app.controller.module'
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
            //.state('addressMng', {
            //    url:'/addressMng',
            //    template:'<div>address</div>',
            //    //templateUrl:'',
            //    controller:'AddressManagementController as vm'
            //})
    }

})();