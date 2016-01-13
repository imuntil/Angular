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
        .factory('shareFn', shareFn);

    userAuthorization.$inject = ['$http', '$q', '$window', '$location', 'deviceUtils', '$timeout', '$cookies', '$rootScope'];
    function userAuthorization($http, $q, $window, $location, deviceUtils, $timeout, $cookies, $rootScope) {
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

            alert('start');
            if (!deviceUtils.isWeichatBro) {
                alert('no');
                $timeout(function () {
                    setInfos({
                        userNick:'123',
                        headerImg:'simulation img',
                        openId:'simulation-id-1234567'
                    }, defer);
                }, 500, false);
                return defer.promise;
            }

            alert('yes');
            $http({
                method:'GET',
                url:output
            }).success(function (data) {
                var reUrl = login + gtype +'&url=' + location;
                alert(JSON.stringify(data));
                if (gtype === 1) {
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenId) {
                        setInfos({ openId:data.msg.UserOpenId }, defer);
                    } else {
                        checkLocal(reUrl, defer);
                    }

                } else if (gtype === 2) {
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenId && data.msg.Uinfo.nickname) {
                        setInfos({
                            userNick:data.msg.Uinfo.nickname,
                            headerImg:data.msg.Uinfo.headimgurl,
                            openId:data.msg.UserOpenId
                        }, defer);
                    } else {
                        checkLocal(reUrl, defer);
                    }
                }

            }).error(function () {
                reUa(login + gtype +'&url=' + location)
            });
            return defer.promise;
        }

        function checkLocal(reUrl, defer) {
            var _local = $cookies.getObject(auKey);
            if (_local && _local.userNick) {
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
})();