/**
 * Created by ±ó on 2015/11/14.
 */
define(['angular', 'domReady','app', 'router']
    , function (angular) {
        "use strict";
        require(['domReady!'], function (document) {
            angular.bootstrap(document, ['myApp'])
        });
    });