/**
 * Created by 斌 on 2015/11/25.
 */
define(
    [
        'angular',
        'ui-router' ,
        'WelcomeAController',
        'TopBarController'
    ],
    function (angular) {
        return angular.module('RoverApp', [
            'ui.router',

            'app.controllers.WelcomeAController',
            'app.controllers.TopBarController'
        ]);
    }
);