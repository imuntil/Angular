/**
 * Created by jtun02 on 16/1/15.
 */
(function () {
    "use strict";
    angular.module('app.UserInfoController', [
        'app.services.wechatRelated',
        'app.services.couponsAbout',
        'app.services.http'
    ])
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['userAuthorization', 'couponsAbout', '$scope', 'commonData', '$state'];
    function UserInfoController(userAuthorization, couponsAbout, $scope, commonData, $state) {
        var vm = this;
        vm.info = userAuthorization.infos;
        vm.balance = 0;
        vm.class = 'user-info';
        vm.coupons = undefined;

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
            })
        }
    }
})();