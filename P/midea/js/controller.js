/**
 * Created by 斌 on 2015/9/22.
 */
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