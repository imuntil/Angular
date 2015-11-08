/**
 * Created by ±ó on 2015/11/8.
 */
(function () {
    angular.module('app.CouponManagementController', [
        'app.services.couponsAbout',
        'app.services.order-info',
    ])
        .controller('CouponManagementController', CouponManagementController);

    CouponManagementController.$inject = ['couponsAbout', 'orderInfo'];
    function CouponManagementController(couponsAbout, orderInfo) {
        var vm = this;
        vm.backToMain = backToMain;
        vm.cancelToUseCp = cancelToUseCp;
        vm.chooseCoupon = chooseCoupon;
        vm.class = 'coupons';
        vm.coupons = [];

        active();
        function active() {
            return couponsAbout.getCoupons()
                .then(function (data) {
                    vm.coupons = data;
                })
        }
        function chooseCoupon(index) {
            couponsAbout.chosenCp = vm.coupons[index];
            orderInfo.info.odiscount = couponsAbout.chosenCp.price;
            backToMain();
        }
        function backToMain() {
            window.history.back();
        }
        function cancelToUseCp() {
            couponsAbout.chosenCp = {};
            orderInfo.info.odiscount = 0;
            backToMain();
        }
    }
})();