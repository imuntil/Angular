(function () {
    var app = angular.module('myApp', ['app.controllers',
        //'app.services.wechatRelated',
        'app.wechatRelated',
        'app.datas']);
    app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index/0');
        $stateProvider
            .state('index', {
                url:'/index/:movieID',
                views:{
                    '':{
                        templateUrl:'views/index.html'
                    },
                    'KV@index':{
                        template:'<header><p>LOGO<br/>活动KV</p></header>'
                    },
                    'main@index':{
                        //template:'<div><div><video ng-src="{{movieURL}}" controls="controls" id="t-movie"></div></div>',
                        //template:'<div><md-video md-src="movieURL" md-controls="controls" md-autoplay="autoplay"></md-video></div>',
                        template:'<div><md-video></md-video></div>',
                        controller: 'IndexController'
                    }
                }
            })
            .state('index.ends', {
                url:'/ends',
                views:{
                    'main@index':{
                        templateUrl:'views/ends.html',
                        controller: 'EndsController'
                    }
                }
            })
            .state('index.share', {
                url:'/share',
                views:{
                    'main@index':{
                        templateUrl:'views/share.html',
                        controller: 'ShareController'
                    }
                }

            });
    }]);

    run.$inject = ['wechatConfig', 'defaultShare'];
    function run(wechatConfig, defaultShare) {
        wechatConfig.setConfig(true);
        wx.ready(function () {
            var pro = defaultShare();
            pro.sam.then(function () {
                alert('分享好友成功');
            });
            pro.stl.then(function () {
                alert('分享朋友圈成功');
            });
        });

    }
    app.run(run);

})();
(function () {
    angular.module('app.controllers', ['ui.router', 'app.datas', 'ngSanitize', 'app.wechatRelated', 'h5video'])
        .controller('IndexController', ['$scope', '$state', '$sce', '$stateParams', 'movies', 'ends', 'shared', '$rootScope',
            function ($scope, $state, $sce, $stateParams, movies, ends, shared, $rootScope) {

                var mid = $stateParams.movieID;
                //$scope.movieURL = movies[mid];
                $scope.movieURL = $sce.trustAsResourceUrl(movies[mid]);
                $scope.controls = true;
                $scope.autoplay = false;
                //$scope.movie = document.querySelector('#t-movie');
                //$scope.movie.load();
                ////$scope.movie.play();
                //$scope.movie.addEventListener('ended', function (e) {
                //
                //    if (mid == 0) {
                //        $state.go('index.ends');
                //    } else {
                //        ends[mid - 1].watched = true;
                //
                //        if (!shared.hasShared) {
                //            shared.hasShared = true;
                //            $state.go('index.share');
                //        } else {
                //            $state.go('index.ends');
                //        }
                //    }
                //}, false);
                $scope.videoEnd = function() {
                    if (mid == 0) {
                        $state.go('index.ends');
                    } else {
                        ends[mid - 1].watched = true;

                        if (!shared.hasShared) {
                            shared.hasShared = true;
                            $state.go('index.share');
                        } else {
                            $state.go('index.ends');
                        }
                    }
                };

                $rootScope.layerShow = false;
            }])
        .controller('EndsController', ['$scope', '$state', '$location', 'ends', '$rootScope',
            function ($scope, $state, $location, ends, $rootScope) {
                $scope.ends = ends;
                $scope.watchMovies = function (index) {
                    //$scope.ends[index-1].watched = true;
                    if ($scope.ends[index-1].watched) return;
                    $location.path('/index/'+index)
                };

                $rootScope.layerShow = false;
            }])
        .controller('ShareController', ['$rootScope', '$scope', '$state', 'WechatBrowser', 'defaultShare',
            function ($rootScope, $scope, $state, WechatBrowser, ds) {
                $rootScope.isWechat = WechatBrowser;
                $rootScope.layerShow = false;
                $rootScope.hideLayer = function () {
                    $rootScope.layerShow = false;
                };

                $scope.wxShare = function () {
                    $rootScope.layerShow = true;

                    var pro = ds({title:'这是另一个分享'});
                    pro.sam.then(shareCallback);
                    pro.stl.then(shareCallback);
                };
                $scope.wbShare = function () {
                    console.log('sina');
                };

                function shareCallback() {
                    $state.go('index.ends');
                }
            }]);
})();
(function () {
    angular.module('h5video', [])
        .directive('mdVideo', function () {

            return {
                restrict:'AE',
                template:'<video ng-src="{{movieURL}}" v-controls="{{controls}}" v-play="{{autoplay}}"></video>',
                replace:true,
                //scope: {
                //    mdSrc:'=',
                //    mdControls:'=',
                //    mdAutoplay:'='
                //},
                scope: true,
                link: function (scope, element, attrs) {
                    //console.log(element);
                    if (attrs.vControls == 'true') {
                        element.attr('controls', true);
                    }
                    if (attrs.vPlay == 'true') {
                        element.attr('autoPlay', true);
                    }

                    var movie = element[0];

                    movie.addEventListener('canplay', function (e) {
                        movie.play();
                    });
                    movie.addEventListener('ended', function (e) {
                        scope.videoEnd();
                    });
                }
            }
        });

})();
(function () {
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
})();