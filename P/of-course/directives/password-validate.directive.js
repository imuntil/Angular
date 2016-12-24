/**
 * Created by 斌 on 2016/12/8.
 */
(function(){
    angular.module('app.directives.passwordValidate', [])
        .directive('pV', passwordValidate);

    function passwordValidate() {
        var p = /^[a-zA-Z\d\~\!\@\#\$\%\^\&\*\(\)\-\=\[\]\;\'\,\.\_\+\{\}\:\"\<\>\/]{6,16}$/;
        return {
            require:'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if(p.test(viewValue)) {

                        ctrl.$setValidity('pv', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('pv', false);
                        return undefined;
                    }
                });
            }
        }
    }
})();