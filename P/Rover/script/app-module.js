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
        'FirstStepController',
        'SecondStepController',
        'ThirdStepController',
        'FourthStepController',
        'FooterController'
    ],
    function (angular) {
        return angular.module('RoverApp', [
            'ui.router',
            'ngCookies',
            'app.controllers.WelcomeAController',
            'app.controllers.TopBarController',
            'app.controllers.CatalogueController',
            'app.controllers.FirstStepController',
            'app.controllers.SecondStepController',
            'app.controllers.ThirdStepController',
            'app.controllers.FourthStepController',
            'app.controllers.FooterController'
        ]);
    }
);