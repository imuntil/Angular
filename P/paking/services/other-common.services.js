/**
 * Created by jtun02 on 15/11/12.
 */
(function () {
    "use strict";

    angular.module('iu.services.otherCommons', [])
        .factory('deviceUtils', deviceUtils);

    function deviceUtils() {
        var ua = navigator.userAgent.toLowerCase();
        var service = {
            d:gd(),
            isWeichatBro:wb()
        };
        return service;

        function gd() {
            var d = {};
            (/mobile/.test(ua)) ? d.mobile = true : d.mobile = false;
            (ua.match(/ipad/i) === "ipad")? d.ipad = true : d.ipad= false;
            (ua.match(/iphone os/i) === "iphone os")? d.iphone = true : d.iphone= false;
            (ua.match(/android/i) === "android")? d.android = true : d.android= false;
            (ua.match(/windows phone/i) === "windows phone")? d.winPhone = true : d.winPhone = false;
            return d;
        }
        function wb() {
            if (/mobile/.test(ua) && /micromessenger/.test(ua)) {
                return true;
            }
            return false;
        }
    }
})();