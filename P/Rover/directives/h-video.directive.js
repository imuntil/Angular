/**
 * Created by 斌 on 2015/12/16.
 */
define(
    ['angular'],
    function (angular) {
        "use strict";


        function hVideo() {
            return {
                restrict:'A',
                scope:{},
                link: function (iScope, iEle, iAttrs) {
                    
                }
            }
        }
        angular.module('app.directives.hVideo', [])
            .directive('hVideo', hVideo);
    }
);