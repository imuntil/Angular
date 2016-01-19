/**
 * Created by jtun02 on 16/1/19.
 */
(function () {
    "use strict";

    angular.module('app.UserAssetsController', [
        'app.services.http',
        'app.services.couponsAbout'
    ])
        .controller('UserAssetsController', UserAssetsController);

    UserAssetsController.$inject = ['$stateParams', 'couponsAbout', 'commonData', '$scope'];
    function UserAssetsController($stateParams, couponsAbout, commonData, $scope) {
        var vm = this;
        vm.class = 'user-assets';
        vm.coupons = undefined;
        vm.status = parseInt($stateParams.status, 10) || 1;

        active();
        function active() {
            if (commonData.OPENID) {
                getCoupons();
            } else {
                $scope.$on('got:OPENID', function (e) {
                    getCoupons();
                });
            }
        }
        function getCoupons() {
            couponsAbout.getCoupons().then(function (data) {
                vm.coupons = data;
            });
        }
    }
})();