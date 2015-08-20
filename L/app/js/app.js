/**
 * Created by jtun02 on 15/8/18.
 */
var bookStoreApp = angular.module('bookStoreApp', [
    'ngRoute', 'ngAnimate','bookStoreCtrls'
]);

bookStoreApp.config(function($routeProvider) {
    $routeProvider
        .when('/hello', {
            templateUrl:'tpls/hello.html',
            controller:'HelloCtrl'
        })
        .when('/list', {
            templateUrl:'tpls/bookList.html',
            controller:'BookListCtrl'
        })
        .otherwise({
            redirectTo:'/hello'
        });
});