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
        });
    //this is changes
})