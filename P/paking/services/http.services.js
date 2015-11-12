/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.services.http', [])
        .constant('commonData', {
            BASE_URL: 'http://m.jtuntech.com/Baking/',
            OPENID:undefined
        })
        .factory('checkAuth', checkAuth);

    checkAuth.$inject = ['commonData', '$rootScope', '$q'];
    function checkAuth(commonData, $rootScope, $q) {
        var service = {
            chAu:check
        };
        return service;
        function check() {
            var defer = $q.defer();
            if (commonData.OPENID !== undefined) {
                defer.resolve();
            } else {
                $rootScope.$on('got:ua', function () {
                    defer.resolve();
                });
            }
            return defer.promise;
        }
    }

})();