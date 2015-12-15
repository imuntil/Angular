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

        'localData'
    ],
    function (angular) {
        return angular.module('RoverApp', [
            'ui.router',
            'ngCookies',
            'app.controllers.WelcomeAController',
            'app.controllers.TopBarController',
            'app.controllers.CatalogueController',

            'app.services.localData'
        ]);
    }
);