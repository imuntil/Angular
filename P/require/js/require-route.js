/**
 * Created by �� on 2015/11/14.
 */
define(['app', 'text!../views/ends.html'], function (app, end) {
    return app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index/0');
        $stateProvider
            .state('index', {
                url:'/index/:movieID',
                views:{
                    '':{
                        templateUrl:'views/index.html'
                    },
                    'KV@index':{
                        template:'<header><p>LOGO<br/>KV</p></header>'
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
                        //templateUrl:'views/ends.html',
                        template:end,
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
    }])
        //.run(['wechatConfig', 'defaultShare', function (wechatConfig, defaultShare) {
    //    wechatConfig.setConfig(true);
    //    wx.ready(function () {
    //        var pro = defaultShare();
    //        pro.sam.then(function () {
    //            alert('������ѳɹ�');
    //        });
    //        pro.stl.then(function () {
    //            alert('��������Ȧ�ɹ�');
    //        });
    //    });
    //
    //}]);

    //run.$inject = ['wechatConfig', 'defaultShare'];
    //function run(wechatConfig, defaultShare) {
    //    wechatConfig.setConfig(true);
    //    wx.ready(function () {
    //        var pro = defaultShare();
    //        pro.sam.then(function () {
    //            alert('������ѳɹ�');
    //        });
    //        pro.stl.then(function () {
    //            alert('��������Ȧ�ɹ�');
    //        });
    //    });
    //
    //}


});