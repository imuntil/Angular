/**
 * Created by 斌 on 2015/11/11.
 */
(function () {
    "use strict";

    angular.module('app.services.wechatRelated', [
        'iu.services.otherCommons',
        'ngCookies'
    ])
        .factory('userAuthorization', userAuthorization)
        .provider('wechatConfig', wechatConfig)
        .provider('wxCopywriter', wxCopywriter)
        .factory('shareFn', shareFn)
        .factory('WXAPIS', WXAPIS);


    userAuthorization.$inject = ['$http', '$q', '$window', '$location', 'deviceUtils', '$timeout', '$cookies', '$rootScope', 'iuLocalStorage'];
    function userAuthorization($http, $q, $window, $location, deviceUtils, $timeout, $cookies, $rootScope, iuLocalStorage) {
        var output = 'http://api.jtuntech.com/event/2015/Q2/gymax/wx/output.php',
            login = 'http://api.jtuntech.com/event/2015/Q2/gymax/wx/login.php?gtype=';
        var location = $location.absUrl();
        var auKey = 'FJUNGDDLJFIO038JFHGU75YTHEJCN8GYE820DJFJ';
        var service = {
            start:start,
            infos:{
                userNick:'',
                headerImg:'',
                openId:''
            }
        };
        return service;

        function start(gtype) {
            var defer = $q.defer();
            gtype = gtype || 1;

            if (!deviceUtils.isWeichatBro) {
                $timeout(function () {
                    setInfos({
                        userNick:'123',
                        headerImg:'img/sos.jpg',
                        openId:'ouVekuN3nc2UIApxg_2oZa6z4HDg'
                    }, defer);
                }, 500, false);
                return defer.promise;
            }

            $http({
                method:'GET',
                url:output
            }).success(function (data) {
                var reUrl = login + gtype +'&url=' + location;
                if (gtype === 1) {
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenId) {
                        setInfos({ openId:data.msg.UserOpenId }, defer);
                    } else {
                        checkLocal(reUrl, defer, 'openId');
                    }

                } else if (gtype === 2) {
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenId && data.msg.Uinfo.nickname) {
                        setInfos({
                            userNick:data.msg.Uinfo.nickname,
                            headerImg:data.msg.Uinfo.headimgurl,
                            openId:data.msg.UserOpenId
                        }, defer);
                    } else {
                        checkLocal(reUrl, defer, 'userNick');
                    }
                }

            }).error(function () {
                reUa(login + gtype +'&url=' + location)
            });
            return defer.promise;
        }

        function checkLocal(reUrl, defer, keys) {
            var _local = $cookies.getObject(auKey) || iuLocalStorage.getValue(auKey);
            if (_local && _local[keys]) {
                setInfos(_local, defer);
            } else {
                reUa(reUrl);
            }
        }

        function reUa(url) {
            $window.location.href = url;
        }

        function setInfos(infos, defer) {
            angular.extend(service.infos, infos);
            $cookies.putObject(auKey, service.infos);
            iuLocalStorage.putValue(auKey, service.infos);
            defer && defer.resolve(service.infos);
            broadcastMsg();
        }

        function broadcastMsg() {
            $rootScope.$broadcast('got:ua', service.infos);
        }
    }

    function wechatConfig() {
        var defaultUrl = 'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config';
        var defaultList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ];
        _get.$inject = ['$http'];

        var provider = {
            setUrl:setUrl,
            $get:_get
        };
        return provider;

        function setUrl(url) {
            url && (defaultUrl = url);
        }

        function _get($http) {
            function getConfig() {
                return $http({
                    method:'GET',
                    url:defaultUrl
                });
            }

            function setApiList(list) {
                defaultList = defaultList.concat(list);
            }

            function setConfig(debug) {
                getConfig().success(function (data) {
                    wx.config({
                        debug:debug || false,
                        appId:data['AppId'],
                        timestamp:data['Stamp'],
                        nonceStr:data['NonceStr'],
                        signature:data['Signature'],
                        jsApiList:defaultList
                    });
                });
            }
            return {
                setConfig:setConfig,
                addApiList:setApiList
            }
        }
    }

    function wxCopywriter() {
        var dc = {
            title:'this is share title',
            desc:'this is share desc',
            link:'this is share link',
            imgUrl:'this is share pic url'
        };
        var provider = {
            $get:_get,
            setCopywriter:sd
        };
        return provider;
        function sd(copywriters) {
            copywriters && angular.extend(dc, copywriters);
        }
        function _get() {
            return dc;
        }
    }

    shareFn.$inject = ['wxCopywriter', '$q'];
    function shareFn(wxCopywriter, $q) {
        var service = {
            shareTimeline:shareTimeline,
            shareAppMessage:shareAppMessage
        };
        return service;

        function shareTimeline(data) {
            var cw = newCW();
            if (angular.isObject(data)) {
                angular.extend(cw, data);
            }
            var defer = $q.defer();
            wx.onMenuShareTimeline({
                title:cw['title'],
                link:cw['link'],
                imgUrl:cw['imgUrl'],
                success: function () {
                    defer.resolve();
                },
                error: function () {
                    defer.reject();
                }
            });
            return defer.promise;
        }

        function shareAppMessage(data) {
            var cw = newCW();
            if (angular.isObject(data)) {
                angular.extend(cw, data);
            }
            var defer = $q.defer();
            wx.onMenuShareAppMessage({
                title:cw['title'],
                desc:cw['desc'],
                link:cw['link'],
                imgUrl:cw['imgUrl'],
                type:'link',
                dataUrl:'',
                success: function () {
                    defer.resolve();
                },
                error: function () {
                    defer.reject();
                }
            });
            return defer.promise;
        }

        function newCW() {
            var cw = wxCopywriter, ncw = {};
            for (var i in cw) {
                ncw[i] = cw[i];
            }
            return ncw;
        }
    }

    WXAPIS.$inject = ['$q'];
    function WXAPIS($q) {
        var service = {
            getLocation:getLocation,
            location:{},
            WXPay:WXPay
        };
        return service;

        function getLocation() {
            var defer = $q.defer();
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    service.location.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    service.location.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    service.location.speed = res.speed; // 速度，以米/每秒计
                    service.location.accuracy = res.accuracy; // 位置精度
                    defer.resolve(res);
                }
            });
            return defer.promise;
        }

        function WXPay(data) {
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