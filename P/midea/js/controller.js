/**
 * Created by 斌 on 2015/9/22.
 */
angular.module('app.controllers', ['ui.router', 'app.service', 'ngSanitize'])
    .controller('IndexController', ['$scope', '$state', '$sce', '$stateParams', 'movies', 'ends', 'shared',
        function ($scope, $state, $sce, $stateParams, movies, ends, shared) {

            var mid = $stateParams.movieID;
            $scope.movieURL = $sce.trustAsResourceUrl(movies[mid]);
            $scope.movie = document.querySelector('#t-movie');
            $scope.movie.load();
//                        $scope.movie.play();
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
        }])
    .controller('EndsController', ['$scope', '$state', '$location', 'ends',
        function ($scope, $state, $location, ends) {
            $scope.ends = ends;
            $scope.watchMovies = function (index) {
                //$scope.ends[index-1].watched = true;
                if ($scope.ends[index-1].watched) return;
                $location.path('/index/'+index)
            }
        }])
    .controller('ShareController', ['$rootScope', '$scope', '$state', 'WechatBrowser',
        function ($rootScope, $scope, $state, WechatBrowser) {
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
        }]);