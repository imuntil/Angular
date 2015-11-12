/**
 * Created by 斌 on 2015/11/11.
 */
(function () {
    "use strict";

    angular.module('app.services.wechatRelated', [
        'iu.services.otherCommons',
        'ngCookies'
    ])
        .factory('userAuthorization', userAuthorization);

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

            if (!deviceUtils.isWeichatBro) {
                $timeout(function () {
                    setInfos({
                        userNick:'simulation nick',
                        headerImg:'simulation img',
                        openId:'simulation-id-1234567'
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
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenid) {
                        setInfos({ openId:data.msg.UserOpenId }, defer);
                    } else {
                        checkLocal(reUrl, defer);
                    }

                } else if (gtype === 2) {
                    if (parseInt(data.status, 10) === 1 && data.msg.UserOpenid && data.msg.Uinfo.nickname) {
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
})();