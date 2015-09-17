/**
 * Created by jtun02 on 15/8/18.
 */
var bookStoreApp = angular.module('bookStoreApp', [
    'ngRoute', 'ngAnimate','bookStoreCtrls', 'app.interceptor'
])
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//                console.log('$routeChangeStart-next:'+next);
//                console.log('$routeChangeStart-current:'+current);
//                console.log(next);
//                console.log(current);
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
}).config(function ($httpProvider) {
    $httpProvider.interceptors.push('interceptor');
});

angular.module('app.interceptor', [])
    .factory('interceptor', function ($q, $rootScope) {
        var interceptor = {
            response: function (response) {
                console.log('success');
                console.log(response.config.url);
                $rootScope.$broadcast('got:success');
                return response;
            },
            responseError: function (rejection) {
                console.log('error:' + rejection.status);
                console.log(rejection.config.url);
                $rootScope.$broadcast('got:failure');
                return $q.reject(rejection);
            }
        };
        return interceptor;
    });