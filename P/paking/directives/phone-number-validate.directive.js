/**
 * Created by jtun02 on 15/11/6.
 */
(function () {
    angular.module('app.directives.phoneNumberValidate', [])
        .directive('phoneNumber', phoneNumber);

    function phoneNumber() {
        var mRep = /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/;
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