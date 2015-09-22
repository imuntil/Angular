/**
 * Created by 斌 on 2015/9/21.
 */
var app = angular.module('myApp', ['ui.router', 'app.service', 'ngSanitize']);
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
                    template:'<div><div><video ng-src="{{movieURL}}" controls="controls" id="t-movie" autoplay></div></div>',
                    controller: function ($scope, $state, $sce, $stateParams, movies, ends, shared) {

                        var mid = $stateParams.movieID;
                        $scope.movieURL = $sce.trustAsResourceUrl(movies[mid]);
                        $scope.movie = document.querySelector('#t-movie');
                        $scope.movie.load();
                        $scope.movie.play();
                        $scope.movie.addEventListener('ended', function (e) {

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
                        }, false);
                    }
                }
            }
        })
        .state('index.ends', {
            url:'/ends',
            views:{
                'main@index':{
                    templateUrl:'views/ends.html',
                    controller: function ($scope, $state, $location, ends) {
                        $scope.ends = ends;
                        $scope.watchMovies = function (index) {
                            //$scope.ends[index-1].watched = true;
                            if ($scope.ends[index-1].watched) return;
                            $location.path('/index/'+index)
                        }
                    }
                }
            }
        })
        .state('index.share', {
            url:'/share',
            views:{
                'main@index':{
                    templateUrl:'views/share.html',
                    controller: function ($rootScope, $scope, $state, WechatBrowser) {
                        $rootScope.isWechat = WechatBrowser;
                        $rootScope.layerShow = false;
                        $rootScope.hideLayer = function () {
                            $rootScope.layerShow = false;
                        };

                        $scope.wxShare = function () {
                            $rootScope.layerShow = true;
                        };
                        $scope.wbShare = function () {
                            console.log('sina');
                        };
                    }
                }
            }

        });
});