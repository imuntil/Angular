/**
 * Created by 斌 on 2015/12/13.
 */
(function () {
    angular.module('Shuuemura', [
        'ngAnimate',
        'angular-gestures',
        'iu.directives.slider'
    ])
        .controller('PagesController', PagesController)
        .config(config);

    function PagesController() {
        var vm = this;
        vm.paging = 1;
        vm.DD = false;      //direction down
        vm.swipeDown = swipeDown;
        vm.swipeUp = swipeUp;

        function swipeUp(e) {
            vm.DD = false;
            if (vm.paging >= 7) {
                vm.paging = 7;
            } else {
                vm.paging += 1;
            }
        }
        function swipeDown(e) {
            vm.DD = true;
            if (vm.paging <= 1) {
                vm.paging = 1;
            } else {
                vm.paging -= 1;
            }
        }
    }

    config.$inject = ['hammerDefaultOptsProvider'];
    function config(hammerDefaultOptsProvider) {

        hammerDefaultOptsProvider.set({
            recognizers: [
                [Hammer.Swipe, {}]
            ]
        });
    }
})();