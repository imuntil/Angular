/**
 * Created by jtun02 on 15/9/22.
 */

angular.module('app.service', [])
    .factory('WechatBrowser', function () {

        var device = navigator.userAgent.toLowerCase();
        if (/mobile/.test(device) && /micromessenger/.test(device)) {
            return true;
        }
        return false;

    })
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
            $get: function ($http) {

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
            }
        }
    })
    .factory('shareTimeline', function () {
        return {}
    })
    .factory('shareAppMessage', function () {
        return {};
    })
    .factory('defaultShare', function () {
        return {};
    });