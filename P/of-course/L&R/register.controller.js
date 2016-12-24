/**
 * Created by 斌 on 2016/12/8.
 */
(function () {
    "use strict";
    angular.module('oc.RegisterController', [
        'app.directives.passwordValidate'
    ])
        .controller('RegisterController', RegisterController);

    function RegisterController() {
        var vm = this;
        vm.aniClass = 'ani-register';
    }
})();