/**
 * Created by �� on 2015/11/7.
 */
(function () {
    angular.module('app.services.uiRouter', [
        'app.services.addressOperate',
        'app.services.order-info'
    ])
        .factory('listenAddressMngRouter', listenAddressMngRouter);

    listenAddressMngRouter.$inject = ['$rootScope', 'addressOperate', 'orderInfo'];
    function listenAddressMngRouter($rootScope, addressOperate, orderInfo) {
        var service = {
            listen:listen
        };
        return service;
        function listen() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    if (fromState['name'] === 'addressEdit' && toState['name'] === 'addressMng') {
                        console.log('get');
                    } else if (fromState['name'] === 'products' && toState['name'] === 'product') {
                        orderInfo.resetOrderInfo();
                    }
                });
        }
    }
})();