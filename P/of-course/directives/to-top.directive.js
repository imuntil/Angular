/**
 * Created by 斌 on 2016/12/11.
 */
(function () {
    "use strict";
    angular.module('app.directives.toTop', [])
        .directive('toTop', toTop);

    function toTop() {

        return {
            restrict:'A',
            scope:{
                topShow:'='
            },
            link: function (iScope, iEle, iAttrs) {
                var wh = $(window).height();

                $(document).scroll(function () {
                    var dt = $(document).scrollTop() | 0;
                    if (dt > wh) {
                        iScope.$apply(function () {
                            iScope.topShow = true;
                        });
                    } else {
                        iScope.$apply(function () {
                            iScope.topShow = false;
                        });
                    }
                });

                iEle.bind('click', function () {
                    $('body, html').animate({'scrollTop': 0}, 1000);
                });

                var _dt = $(document).scrollTop() | 0;
                _dt > wh && (iScope.topShow = true);
                _dt <= wh && (iScope.topShow = false);
            }
        }
    }

})();