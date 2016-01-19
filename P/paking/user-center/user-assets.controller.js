/**
 * Created by jtun02 on 16/1/19.
 */
(function () {
    "use strict";

    angular.module('app.UserAssetsController', [

    ])
        .controller('UserAssetsController', UserAssetsController);

    UserAssetsController.$inject = ['$stateParams'];
    function UserAssetsController($stateParams) {
        var vm = this;
        vm.class = 'user-assets';
        vm.status = parseInt($stateParams.status, 10) || 1;
    }
})();