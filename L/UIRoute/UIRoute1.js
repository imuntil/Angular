/**
 * Created by jtun02 on 15/8/19.
 */
var myUIRoute = angular.module('MyUIRoute', ['ui.router', 'ngAnimate']);
myUIRoute.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/state1');
    $stateProvider
        .state('state1', {
            url:'/state1',
            templateUrl:'tpls/state1.html'
        })
        .state('state2', {
            url:'/state2',
            templateUrl:'tpls/state2.html'
        })
        .state('state1.list', {
            resolve:{
                example: function () {
                    return [
                        'a',
                        'example',
                        'of',
                        'resolve'
                    ]
                },
                httpService: function ($http) {
                    return $http({
                        method:'GET',
                        url:'../service/testJson.json'
                    });
                }
            },
            url:'/list',
            templateUrl:'tpls/state1.list.html',
            controller: function($scope, example, httpService) {
                //$scope.items = ['A', 'List', 'Of', 'Items'];
                //$scope.items = example;
                $scope.items = httpService.data;
            }
        })
        .state('state2.list', {
            url:'/list',
            templateUrl:'tpls/state2.list.html',
            controller: function ($scope) {
                $scope.things = ['A', 'Set', 'Of', 'Things'];
            }
        });
});