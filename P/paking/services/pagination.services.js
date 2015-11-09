/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    angular.module('app.services.pagination', [])
        .factory('pagination', pagination);

    function pagination() {
        var service = {
            paging:paging
        };
        return service;
        function paging(arr, count) {
            var result = [],
                i, len = arr.length,
                num = Math.ceil(len / count);

            for (i = 0; i < num; i ++) {
                var child = [];
                var next = i + 1;
                if (next * count < len) {
                    child = arr.slice(i * count, next * count);
                } else {
                    child = arr.slice(i * count, arr.length);
                }
                result.push(child);
                if (child.length === 0) break;
            }
            return result;
        }
    }
})();