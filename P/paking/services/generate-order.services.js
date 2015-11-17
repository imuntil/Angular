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
            GO:GO,
            pay:pay
        };
        return service;
        function GO() {

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

        function pay(data) {
            var defer = $q.defer();
            wx.chooseWXPay({
                timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: data.paySign, // 支付签名
                success: function (res) {
                    // 支付成功后的回调函数
                    defer.resolve();
                }
            });
            return defer.promise;
        }
    }
})();