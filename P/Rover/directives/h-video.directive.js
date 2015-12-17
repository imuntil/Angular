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
                scope:{
                    onEnd:'&'
                },
                link: function (iScope, iEle, iAttrs) {
                    var video = iEle[0];
                    video.src = iAttrs.hSrc;
                    video.load();

                    video.addEventListener('ended', function () {
                        iScope.$apply(function () {
                            iScope.onEnd();
                        });
                    }, false);
                }
            }
        }
        angular.module('app.directives.hVideo', [])
            .directive('hVideo', hVideo);
    }
);