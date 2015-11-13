/**
 * Created by jtun02 on 15/10/13.
 */
(function () {
    angular.module('h5video', [])
        .directive('mdVideo', function () {

            return {
                restrict:'AE',
                template:'<video ng-src="{{movieURL}}" v-controls="{{controls}}" v-play="{{autoplay}}"></video>',
                replace:true,
                //scope: {
                //    mdSrc:'=',
                //    mdControls:'=',
                //    mdAutoplay:'='
                //},
                scope: true,
                link: function (scope, element, attrs) {
                    //console.log(element);
                    if (attrs.vControls == 'true') {
                        element.attr('controls', true);
                    }
                    if (attrs.vPlay == 'true') {
                        element.attr('autoPlay', true);
                    }

                    var movie = element[0];

                    movie.addEventListener('canplay', function (e) {
                        movie.play();
                    });
                    movie.addEventListener('ended', function (e) {
                        scope.videoEnd();
                    });
                }
            }
        });

})();