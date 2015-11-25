/**
 * Created by 斌 on 2015/11/18.
 */
(function () {
    angular.module('RoverApp', [
        'ui.router',

        'app.controllers.WelcomeAController',
        'app.controllers.TopBarController'
    ])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/welcome-1');
        $stateProvider
            .state('welcome-1', {
                url:'/welcome-1',
                templateUrl:'welcome/w-a.html',
                controller:'WelcomeAController'
            })
            .state('welcome-2', {
                url:'/welcome-2',
                templateUrl:'welcome/w-b.html'
            })
            .state('home', {
                url:'/home',
                views:{
                    '':{
                        templateUrl:'main/main-container.html'
                    },
                    'topbar@home':{
                        templateUrl:'main/topbar.html',
                        controller:'TopBarController as vm'
                    },
                    'main@home':{
                        templateUrl:'main/catalogue.html'
                    },
                    'footer@home':{
                        templateUrl:'main/footer.html'
                    }
                }
            })
            .state('home.step-1', {
                url:'/:section/step-1',
                views:{
                    'main@home':{
                        templateUrl:'main/step-1.html'
                    }
                }
            })
            .state('home.step-2', {
                url:'/:section/step-2',
                views:{
                    'main@home':{
                        templateUrl:'main/step-2.html'
                    }
                }
            })
            .state('home.step-3', {
                url:'/:section/step-3',
                views:{
                    'main@home':{
                        templateUrl:'main/step-3.html'
                    }
                }
            })
            .state('home.step-4', {
                url:'/:section/step-4',
                views:{
                    'main@home':{
                        templateUrl:'main/step-4.html'
                    }
                }
            })
    }
    //$state.go('addressEdit',{addressIndex:index});
    //http://api.jtuntech.com/event/2015/landrover/assets/video/v-1.mp4
    //ogv webm
})();