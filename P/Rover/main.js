/**
 * Created by 斌 on 2015/11/25.
 */
require.config({
    paths:{
        'angular':'../../framework/1.4.7/angular',
        'ui-router':'../../ui-router/angular-ui-router.min',
        'domReady':'../../Tools/domReady',
        'cookies':'../../framework/1.4.7/angular-cookies.min',

        'bootstrap':'script/bootstrap',
        'app':'script/app-module',
        'route':'script/app-route',

        'WelcomeAController':'welcome/w-a.controller',
        'TopBarController':'main/topbar.controller',
        'CatalogueController':'main/catalogue.controller',
        'FirstStepController':'main/first-step.controller',

        'localData':'services/local-data.service',

        'hVideo':'directives/h-video.directive',
        'steps':'directives/steps.directive'
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'ui-router':{
            deps:['angular'],
            exports:'ui-router'
        },
        'cookies':{
            deps:['angular'],
            exports:'cookies'
        }
    },
    deps:['bootstrap']
});