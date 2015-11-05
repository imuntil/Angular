/**
 * Created by ±ó on 2015/11/5.
 */
(function () {
    angular.module('app.services.module', [])
        .factory('availableDates', availableDates);

    function availableDates() {
        var service = {
            dates: available
        };
        return service;

        function available(start, end) {
            var dates = [];
            for (var i = start; i < end; i++) {
                dates.push(moment().add(i, 'd').format('MM-DD-YYYY'));
            }
            return dates;
        }
    }
})();