/**
 * Created by jtun02 on 15/8/19.
 */
var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl:'tpls2/home.html'
        })
        .state('home.list', {
            url:'/list',
            templateUrl:'tpls2/home-list.html',
            controller: function ($scope) {
                $scope.topics = ['Butterscotch', 'Black Current', 'Mango'];
            }
        })
        .state('home.paragraph', {
            url:'/paragraph',
            template:'I could sure user a scoop of ice-cream.'
        })
        .state('about', {
            url:'/about',
            views: {
                '': {
                    templateUrl:'tpls2/about.html'
                },
                'columnOne@about': {
                    template:'这里是第一列的内容'
                },
                'columnTwo@about': {
                    templateUrl:'tpls2/table-data.html',
                    controller: 'Controller'
                }
            }
        })
        .state('others', {
            url:'/others',
            views:{
                '': {
                    templateUrl:'tpls2/others.html'
                },
                'rowOne@others':{
                    template:'这里是第一行的内容'
                },
                'rowTwo@others':{
                    templateUrl:'tpls2/others-data.html',
                    controller:'OtherCtrl'
                },
                'rowThree@others':{
                    template:'もうないよ'
                }
            }
        });
});
routerApp.controller('Controller', function ($scope) {
    $scope.message = 'test';
    $scope.topics = [{
        name: 'Butterscotch',
        price: 50
    }, {
        name: 'Black Current',
        price: 100
    }, {
        name: 'Mango',
        price: 20
    }];
});
routerApp.controller('OtherCtrl', function ($scope) {
    $scope.scores = [
        {
            name: 'Butterscotch',
            score: 9
        },
        {
            name: 'Black Current',
            score: 8.7
        },
        {
            name: 'Mango',
            score: 8.5
        }
    ]
});


//a little change