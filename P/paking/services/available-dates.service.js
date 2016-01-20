/**
 * Created by �� on 2015/11/5.
 */
(function () {
    angular.module('app.services.availableDates', [])
        .factory('availableDates', availableDates);

    function availableDates() {
        var service = {
            dates: available
        };
        return service;

        function available(start, end, format) {
            var dates = [];
            for (var i = start; i < end; i++) {
                dates.push(moment().add(i, 'd').format(format || 'MM-DD-YYYY'));
            }
            return dates;
        }
    }
})();