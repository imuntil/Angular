/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    angular.module('app.services.swiperTools', [])
        .factory('swiperTools', swiperTools);

    swiperTools.$inject = ['$rootScope'];
    function swiperTools($rootScope) {
        var service = {
            swiper:swiper,
            activeIndex:1
        };
        return service;
        function swiper(slides) {
            return new Swiper('.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 0,
                preloadImages: true,
                loop: true,
                onSlideChangeEnd: function (swiper) {
                    $rootScope.$apply(function () {
                        if (swiper.activeIndex % slides === 0) {
                            service.activeIndex = slides;
                        } else {
                            service.activeIndex = swiper.activeIndex % slides;
                        }
                    });
                }
            });
        }
    }
})();