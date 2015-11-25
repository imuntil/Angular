/**
 * Created by 斌 on 2015/11/25.
 */
require.config({
    paths:{
        'angular':'../../framework/1.3.0.14/angular',
        'ui-router':'../../ui-router/angular-ui-router.min',
        'domReady':'../../Tools/domReady',

        'bootstrap':'script/bootstrap',
        'app':'script/app-module',
        'route':'script/app-route',

        'WelcomeAController':'welcome/w-a.controller',
        'TopBarController':'main/topbar.controller'
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'ui-router':{
            deps:['angular'],
            exports:'ui-router'
        }
    },
    deps:['bootstrap']
});