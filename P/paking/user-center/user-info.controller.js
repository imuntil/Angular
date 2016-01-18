/**
 * Created by jtun02 on 16/1/15.
 */
(function () {
    "use strict";
    angular.module('app.UserInfoController', [
        'app.services.wechatRelated',
        'app.services.couponsAbout'
    ])
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['userAuthorization', 'couponsAbout', '$scope'];
    function UserInfoController(userAuthorization, couponsAbout, $scope) {
        var vm = this;
        vm.info = userAuthorization.infos;
        vm.coupons = undefined;

        $scope.$on('got:ua', function (e, d) {
            active();
        });

        function active() {
            getCoupons();
        }
        function getCoupons() {
            if (couponsAbout.coupons.length === 0) {
                couponsAbout.getCoupons(vm.info.openId).then(function (data) {
                    vm.coupons = data;
                })
            } else {
                vm.coupons = [];
            }
        }
    }
})();