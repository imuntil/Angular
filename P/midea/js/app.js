/**
 * Created by 斌 on 2015/9/21.
 */
var app = angular.module('myApp', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index/ends');
    $stateProvider
        .state('index', {
            url:'/index',
            views:{
                '':{
                    template:'<div class="container"><div ui-view="KV"></div><div ui-view="main"></div></div>'
                },
                'KV@index':{
                    template:'<header><p>LOGO<br/>活动KV</p></header>'
                },
                'main@index':{
                    template:'<div><div>movie</div><p>活动文案</p></div>'
                }
            }
        })
        .state('index.ends', {
            url:'/ends',
            views:{
                'main@index':{
                    templateUrl:'views/ends.html',
                    controller: function ($scope, $state) {
                        $scope.ends = [
                            {movie:'结局1',watched:false},
                            {movie:'结局2',watched:false},
                            {movie:'结局3',watched:false},
                            {movie:'结局4',watched:false},
                            {movie:'结局5',watched:false},
                            {movie:'结局6',watched:false}
                        ];
                        $scope.watchMovies = function (index) {
                            console.log(index);
                            $scope.ends[index].watched = true;
                        }
                    }
                }
            }
        });
});