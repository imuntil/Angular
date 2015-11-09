/**
 * Created by jtun02 on 15/11/5.
 */
(function () {
    angular.module('app.services.order-info', [])
        .factory('orderInfo', orderInfo);

    orderInfo.$inject = ['$rootScope'];
    function orderInfo($rootScope) {
        var service = {
            info:{
                pid      :undefined,  //商品id
                pcount   :undefined,  //商品数量
                pname    :undefined,  //商品名称
                pprice   :undefined,  //商品单价
                ptotal   :undefined,  //商品总价


                oadrid   :undefined,  //订单地址
                odate    :undefined,  //送货时间
                //ocoupon  :undefined,  //优惠券
                oservice :5,  //服务费
                ouseba   :false,       //使用余额抵扣
                obalance :0,  //余额抵扣金额
                odiscount:0,  //优惠金额
                opay     :undefined   //应付金额
            },
            coupon:{

            },
            watchInfo:watchInfo,
            watching:false,
            generateOrder:generateOrder,
            revokeWatch:undefined,
            resetOrderInfo:resetOrderInfo
        };
        return service;

        function watchInfo() {
            if (service.watching) {
                return;
            }
            service.watching = true;
            service.revokeWatch = $rootScope.$watch(function () {
                return service.info;
            }, function () {
                var _info = service.info;
                _info.opay = _info.ptotal + _info.oservice
                    - (_info.ouseba ? _info.obalance : 0)
                    - _info.odiscount;
            }, true);
        }
        function generateOrder(pinfo) {
            angular.extend(service.info, pinfo);
        }
        function resetOrderInfo() {
            if (angular.isDefined(service.revokeWatch)) {
                service.revokeWatch();
                service.watching = false;
            }
            service.coupon = {};
            angular.forEach(service.info, function (item, key) {
                this[key] = undefined;
            }, service.info);
            service.info.oservice = 5;
            service.info.ouseba = false;
            service.info.obalance = 0;
            service.info.odiscount = 0;
        }
    }
})();