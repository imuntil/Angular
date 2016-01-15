/**
 * Created by jtun02 on 16/1/15.
 */
(function () {
    "use strict";
    angular.module('app.UserInfoController', [
        'app.services.wechatRelated'
    ])
        .controller('UserInfoController', UserInfoController);

    function UserInfoController(userAuthorization) {
        var vm = this;
        vm.info = userAuthorization.infos;
    }
})();