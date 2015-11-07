/**
 * Created by ±ó on 2015/11/7.
 */
(function () {
    angular.module('app.services.uiRouter', [
        'app.services.addressOperate'
    ])
        .factory('listenAddressMngRouter', listenAddressMngRouter);

    listenAddressMngRouter.$inject = ['$rootScope', 'addressOperate'];
    function listenAddressMngRouter($rootScope, addressOperate) {
        var service = {
            listen:listen
        };
        return service;
        function listen() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    if (fromState['name'] === 'addressEdit' && toState['name'] === 'addressMng') {
                        console.log('get');
                    }
                });
        }
    }
})();