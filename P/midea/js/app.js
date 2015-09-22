/**
 * Created by 斌 on 2015/9/21.
 */
var app = angular.module('myApp', ['app.controllers', 'app.wechatRelated']);
app.config(function ($stateProvider, $urlRouterProvider) {
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
                    template:'<div><div><video ng-src="{{movieURL}}" controls="controls" id="t-movie"></div></div>',
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
});
app.run(function(wechatConfig) {
    wechatConfig.setConfig(true)
});