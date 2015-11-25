/**
 * Created by 斌 on 2015/11/25.
 */
define(
    ['angular', 'domReady', 'app', 'route'],
    function (angular) {
        "use strict";
        require(['domReady!'], function (document) {
            angular.bootstrap(document, ['RoverApp']);
        });
    }
);