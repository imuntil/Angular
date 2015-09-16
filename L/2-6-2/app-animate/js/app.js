/**
 * Created by jtun02 on 15/8/18.
 */
var bookStoreApp = angular.module('bookStoreApp', [
    'ngRoute', 'ngAnimate','bookStoreCtrls'
])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//                console.log('$routeChangeStart-next:'+next);
//                console.log('$routeChangeStart-current:'+current);
                console.log(next);
                console.log(current);
            });
        $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
//                console.log('$routeChangeSuccess-current:'+current);
//                console.log('$routeChangeSuccess-previous:'+previous);
            });
    }]);

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