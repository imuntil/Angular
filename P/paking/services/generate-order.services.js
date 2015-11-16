/**
 * Created by 斌 on 2015/11/16.
 */
(function () {
    angular.module('app.services.generateOrder', [
        'app.services.order-info',
        'app.services.http'
    ])
        .factory('generateOrder', generateOrder);

    generateOrder.$inject = ['$http', '$q', 'orderInfo', 'commonData'];
    function generateOrder($http, $q, orderInfo, commonData) {
        var service = {
            GO:GO
        };
        return service;
        function GO() {

            //oadrid: 104
            //obalance: 0
            //odate: "11-20-2015"
            //odiscount: 0
            //opay: 29
            //oservice: 5
            //ouseba: false
            //pcount: 2
            //pid: "22"
            //pname: "呵呵哒订单"
            //pprice: 12
            //ptotal: 24

            var oi = orderInfo.info,
                params = {
                    openid:commonData.OPENID,
                    orderpro:oi.pid,
                    procount:oi.pcount,
                    orderaddress:oi.oadrid,
                    proname:oi.pname,

                    orderprice:oi.ptotal,
                    ordertype:'微信支付',
                    orderstatus:1,
                    arrivetime:oi.odate
                };

            var defer = $q.defer();
            $http({
                method:'GET',
                params:params,
                url:commonData.BASE_URL + 'saveOrderOdr!saveOrder'
            }).success(function (data) {
                if (parseInt(data['resultcode'], 10) === 1) {
                    defer.resolve(data['result']);
                } else {
                    defer.reject(data);
                }
            }).error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        }

        function pay() {

        }
    }
})();