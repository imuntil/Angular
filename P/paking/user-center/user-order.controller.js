/**
 * Created by jtun02 on 16/1/19.
 */
(function () {
    "use strict";
    angular.module('app.UserOrderController', [
        'app.services.order-info',
        'app.services.http'
    ])
        .controller('UserOrderController', UserOrderController);

    UserOrderController.$inject = ['orderInfo', 'commonData', '$scope'];
    function UserOrderController(orderInfo, commonData, $scope) {
        var vm = this;
        vm.class = 'user-order';
        vm.orders = undefined;

        active();
        function active() {
            if (commonData.OPENID) {
                getOrders();
            } else {
                $scope.$on('got:OPENID', function (e, d) {
                    getOrders();
                });
            }
        }
        function getOrders() {
            orderInfo.getOrders().then(function (data) {
                vm.orders = data;
            });
        }
    }

})();