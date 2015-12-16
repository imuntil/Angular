/**
 * Created by 斌 on 2015/11/25.
 */
define(
    ['angular', 'localData'],
    function (angular) {
        "use strict";

        TopBarController.$inject = ['localData', '$state', '$timeout'];
        function TopBarController(localData, $state, $timeout) {
            var vm = this;
            vm.data = localData.fetch();
            vm.go = go;
            vm.steps = ['视频','小测试','最佳实践','自我评估'];


            //$timeout(function () {
            //    vm.data.step = 3;
            //}, 1000);

            function go(able, course, step) {
                if (!able) {return;}
                step += 1;
                $state.go('home.step-' + step, {section:course});
            }
        }
        angular.module('app.controllers.TopBarController', [])
            .controller('TopBarController', TopBarController);
    }
);
