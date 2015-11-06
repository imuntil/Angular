/**
 * Created by jtun02 on 15/11/6.
 */
(function () {
    angular.module('app.directives.phoneNumberValid', [])
        .directive('phoneNumber', phoneNumber);

    function phoneNumber() {
        var mRep = /^0?(13[0-9]|15[0123456789]|17[0-9]|18[0123456789]|14[57])[0-9]{8}$/;
        return {
            require:'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (mRep.test(viewValue)) {
                        ctrl.$setValidity('phone', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('phone', false);
                        return undefined;
                    }
                });
            }
        }
    }
})();