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
                ptotal   :400,  //商品总价


                oadrid   :undefined,  //订单地址
                odate    :undefined,  //送货时间
                ocoupon  :undefined,  //优惠券
                oservice :5,  //服务费
                ouseba   :false,       //使用余额抵扣
                obalance :100,  //余额抵扣金额
                odiscount:20,  //优惠金额
                opay     :undefined   //应付金额
            },
            watchInfo:watchInfo
        };
        return service;

        function watchInfo() {
            $rootScope.$watch(function () {
                return service.info;
            }, function () {
                var _info = service.info;
                _info.opay = _info.ptotal + _info.oservice
                    - (_info.ouseba ? _info.obalance : 0)
                    - _info.odiscount;
            }, true);
        }
    }
})();