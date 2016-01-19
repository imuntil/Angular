/**
 * Created by 斌 on 2016/1/19.
 */
(function () {
    "use strict";
    angular.module('app.JoinController', [
        'app.services.JC'
    ])
        .controller('JoinController', JoinController);

    function JoinController() {
        var vm = this;
        vm.f = {
            sex:1
        };
    }
})();