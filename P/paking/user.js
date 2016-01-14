/**
 * Created by 斌 on 2016/1/14.
 */
(function () {
    angular.module('myApp', [
        'ui.router',
        'ngAnimate',

        'app.services.wechatRelated',
        'app.services.http'

    ])
        .config(userCenterConfig)
        .run(appRun);

    userCenterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function userCenterConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/userInfo');
        $stateProvider
            .state('userInfo', {
                url:'/userInfo',
                templateUrl:'user-center/user-info.html'
            })
            .state('addressMng', {
                url:'/addressMng'
            })
            .state('order', {
                url:'/order'
            })
            .state('assets', {
                url:'/assent/:type'
            })
    }

    appRun.$inject = ['userAuthorization', 'commonData'];
    function appRun(userAuthorization, commonData) {
        userAuthorization.start(2).then(function (data) {
            commonData.OPENID = data.openid;
        })
    }
})();