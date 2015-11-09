/**
 * Created by jtun02 on 15/11/9.
 */
(function () {
    angular.module('app.directives.blurValidate', [])
        .directive('vBlur', blurValidate);

    function blurValidate() {
        var FOCUS_CLASS = 'ng-focused';
        return {
            restrict:'A',
            require:'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function () {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function () {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = false;
                    });
                });
            }
        }
    }
})();