/**
 * Created by 斌 on 2015/11/25.
 */
define(
    [
        'angular',
        'ui-router' ,
        'cookies',
        'WelcomeAController',
        'TopBarController',
        'CatalogueController',
        'FirstStepController'
    ],
    function (angular) {
        return angular.module('RoverApp', [
            'ui.router',
            'ngCookies',
            'app.controllers.WelcomeAController',
            'app.controllers.TopBarController',
            'app.controllers.CatalogueController',
            'app.controllers.FirstStepController'
        ]);
    }
);