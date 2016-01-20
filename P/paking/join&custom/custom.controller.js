/**
 * Created by 斌 on 2016/1/19.
 */
(function () {
    "use strict";
    angular.module('app.CustomController', [
        'app.services.availableDates',
        'app.directives.dateSelect',
        'app.services.http'
    ])
        .controller('CustomController', CustomController);

    CustomController.$inject = ['availableDates', 'commonData'];
    function CustomController(availableDates, commonData) {
        var vm = this;
        vm.class = 'custom';
        vm.products = ['蛋糕', '马卡龙'];
        vm.f = {
            name:vm.products[0]
        };

        active();
        function active() {
            getDates();
        }

        function getDates() {
            vm.dates = availableDates.dates(7, 12);
            vm.f.time = vm.dates[0];
        }
    }
})();