/**
 * Created by 斌 on 2016/12/14.
 */
(function () {
    "use strict";
    angular.module('oc.directives.customRadio', [

    ])
        .controller('CustomRadioController', CustomRadioController)
        .directive('customRadio', customRadio);

    function customRadio() {
        return {
            restrict:'AE',
            replace:true,
            require:['customRadio', 'ngModel'],
            transclude:true,
            scope:{
                value:'='
            },
            controller:'CustomRadioController',
            template:'<span class="c-radio" ng-transclude></span>',
            link: function (scope, element, attrs, ctrls) {
                var radioCtrl = ctrls[0],
                    ngModelCtrl = ctrls[1];

                ngModelCtrl.$render = function () {
                    element.toggleClass(radioCtrl.activeClass,
                        angular.equals(ngModelCtrl.$modelValue, scope.value));
                };

                element.on(radioCtrl.toggleEvent, function () {
                    var isActive = element.hasClass(radioCtrl.activeClass);
                    if (!isActive) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(isActive ? null : scope.value);
                            ngModelCtrl.$render();
                        });
                    }
                });
            }
        }
    }
    function CustomRadioController() {
        this.activeClass = 'c-checked';
        this.toggleEvent = 'click';
    }
})();