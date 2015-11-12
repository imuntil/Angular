/**
 * Created by ±ó on 2015/11/12.
 */
(function () {
    angular.module('app.ErrorController', [])
        .controller('ErrorController', ErrorController);

    ErrorController.$inject = ['$interval', '$location'];
    function ErrorController($interval, $location) {
        var vm = this;
        vm.class = 'p-error';
        vm.time = 4;

        var interval = $interval(function () {
            vm.time -= 1;
            if (vm.time === 0) {
                $interval.cancel(interval);
                $location.url('/products').replace();
            }
        }, 1000, 4);
    }
})();