/**
 * Created by 斌 on 2015/9/21.
 */
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