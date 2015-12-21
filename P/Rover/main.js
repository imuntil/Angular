/**
 * Created by 斌 on 2015/11/25.
 */
require.config({
    paths:{
        'angular':'../../framework/1.4.7/angular',
        'ui-router':'../../ui-router/angular-ui-router.min',
        'domReady':'../../Tools/domReady',
        'cookies':'../../framework/1.4.7/angular-cookies.min',
        'sanitize':'../../framework/1.4.7/angular-sanitize.min',

        'bootstrap':'script/bootstrap',
        'app':'script/app-module',
        'route':'script/app-route',

        'WelcomeAController':'welcome/w-a.controller',
        'TopBarController':'main/topbar.controller',
        'CatalogueController':'main/catalogue.controller',
        'FirstStepController':'main/first-step.controller',
        'SecondStepController':'main/second-step.controller',
        'ThirdStepController':'main/third-step.controller',
        'FourthStepController':'main/fourth-step.controller',
        'FooterController':'main/footer.controller',

        'localData':'services/local-data.service',
        'courseData':'services/course-data.service',

        'hVideo':'directives/h-video.directive',
        'steps':'directives/steps.directive',
        'ngDrag':'../../Tools/ngDraggable'
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
        },
        'sanitize':{
            deps:['angular'],
            exports:'sanitize'
        },
        'ngDrag':{
            deps:['angular'],
            exports:'ngDrag'
        }
    },
    deps:['bootstrap']
});