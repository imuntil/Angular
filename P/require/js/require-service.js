/**
 * Created by 斌 on 2015/11/14.
 */
define(['angular'], function () {
    angular.module('app.datas', [])
        .value('movies',[
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2',
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2',
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2',
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2',
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2',
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2',
            'http://data.video.qiyi.com/videos/other/20150626/f3/7b/92a64fea686d55e9814f776b72fa13c2.mp4?pv=0.2'
        ])
        .value('ends', [
            {movie:'结局1',watched:false},
            {movie:'结局2',watched:false},
            {movie:'结局3',watched:false},
            {movie:'结局4',watched:false},
            {movie:'结局5',watched:false},
            {movie:'结局6',watched:false}
        ])
        .value('shared', {hasShared:false});


    angular.module('app.wechatRelated', [])
//    .factory('wechatConfig', function ($http) {
//        var url = 'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config';
//        return {
//            getConfig:$http({
//                method:'GET',
//                url:url
//            }),
//            setConfig: function (debug) {
//                var self = this;
//                self.getConfig.success(function (data) {
//                    wx.config({
//                        debug: debug,
//                        appId: data.AppId,
//                        timestamp: data.Stamp,
//                        nonceStr: data.NonceStr,
//                        signature: data.Signature,
//                        jsApiList: [
//                            'onMenuShareTimeline',
//                            'onMenuShareAppMessage'
//                        ]
//                    });
//                });
//            }
//        }
//    })
        .provider('wechatConfig', function () {
            var defaultUrl = 'http://api.jtuntech.com/event/2015/roewe/jssdk.php?act=config';

            return {
                setUrl: function (url) {
                    url && (defaultUrl = url);
                },
                $get: ['$http', function ($http) {

                    function getConfig() {
                        return $http({
                            method:'GET',
                            url:defaultUrl
                        });
                    }

                    function setConfig(debug) {
                        getConfig().success(function (data) {
                            wx.config({
                                debug: debug,
                                appId: data.AppId,
                                timestamp: data.Stamp,
                                nonceStr: data.NonceStr,
                                signature: data.Signature,
                                jsApiList: [
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage'
                                ]
                            });
                        });
                    }
                    return {
                        setConfig: setConfig
                    }
                }]
            }
        })
        .provider('wxsCopywriter', {
            defaultCW:{
                title: 'wechat share title',
                desc: 'wechat share desc',
                link: 'wechat share link',
                imgUrl: 'wechat share img url'
            },
            setDefaultCW: function (cws) {
                cws && angular.extend(this.defaultCW, cws);
            },
            $get: function () {
                var self = this;
                return self.defaultCW;
            }
        })
        .factory('shareTimeline', ['wxsCopywriter', '$q', function (wxc, $q) {
            var dcw = wxc; //default copywriter
            return function (data) {
                if (angular.isObject(data)) {
                    angular.extend(dcw, data);
                }

                var deferred = $q.defer();

                wx.onMenuShareTimeline({
                    title:dcw.title,
                    link:dcw.link,
                    imgUrl:dcw.imgUrl,
                    success: function () {
                        deferred.resolve();
                    },
                    error: function () {
                        deferred.reject();
                    }
                });

                return deferred.promise;
            }
        }])
        .factory('shareAppMessage', ['wxsCopywriter', '$q', function (wxc, $q) {
            var dcw = wxc; //default copywriter
            return function (data) {
                if (angular.isObject(data)) {
                    angular.extend(dcw, data);
                }

                var deferred = $q.defer();

                wx.onMenuShareAppMessage({
                    title:dcw.title,
                    desc:dcw.desc,
                    link:dcw.link,
                    imgUrl:dcw.imgUrl,
                    type:'link',
                    dataUrl:'',
                    success: function () {
                        deferred.resolve();
                    },
                    error: function () {
                        deferred.reject();
                    }
                });

                return deferred.promise;
            }
        }])
        .factory('defaultShare', ['shareTimeline', 'shareAppMessage', '$q', function (stl, sam, $q) {
            return function (data) {
                var stlPro = stl(data);
                var samPro = sam(data);

                return {
                    sam:samPro,
                    stl:stlPro
                };
            }
        }])
        .factory('WechatBrowser', function () {

            var device = navigator.userAgent.toLowerCase();
            if (/mobile/.test(device) && /micromessenger/.test(device)) {
                return true;
            }
            return false;

        });

});