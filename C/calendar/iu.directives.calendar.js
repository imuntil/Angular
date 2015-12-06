/**
 * Created by 斌 on 2015/12/5.
 */
(function () {
    "use strict";

    angular.module('iu.directives.calendar', [])
        .controller('IUCalendarController', IUCalendarController)
        .directive('iuCalendar', iuCalendar);

    IUCalendarController.$inject = ['$scope'];
    function IUCalendarController($scope) {
        var self = this,
            ngModelCtrl = {$setViewValue: angular.noop};
        this.init = function (years_, ngModelCtrl_) {
            ngModelCtrl = ngModelCtrl_;
            ngModelCtrl.$render = self.render;

            $scope.years = years_;
            $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];

            $scope.$watch('defYear', function (ov, nv) {
                if (ov === nv) {
                    if (ov === undefined) {
                        //console.log($scope.date);
                        initDay();
                    }
                    return;
                }
                self.getDays();
            });
            $scope.$watch('defMonth', function (ov, nv) {
                if (ov === nv) {
                    return;
                }
                self.getDays();
            });

        };
        this.getDays = function () {
            self.render();

            var daysInMonth = new Date($scope.defYear, $scope.defMonth, 0).getDate();
            var ds = [];
            for (var d = 1; d <= daysInMonth; d++) {
                ds.push(d);
            }
            $scope.days = ds;

            if ($scope.defDay > daysInMonth) {
                $scope.defDay = daysInMonth;
            }
            selectDate();
        };
        this.render = function () {
            $scope.date = ngModelCtrl.$viewValue;
        };
        function selectDate() {
            ngModelCtrl.$setViewValue($scope.defYear + '-' + $scope.defMonth + '-' + $scope.defDay);
            ngModelCtrl.$render();
        }
        function toDay() {
            var _d = new Date();
            $scope.defYear = _d.getFullYear();
            $scope.defMonth = _d.getMonth() + 1;
            $scope.defDay = _d.getDate();
        }
        function initDay() {
            if($scope.date === undefined) {
                toDay();
            } else {
                var _d = $scope.date.split('-').map(function (item) {
                    return parseInt(item, 10) || 1;
                });
                //console.log(_d);
                $scope.defYear = _d[0];
                $scope.defMonth = _d[1];
                $scope.defDay = _d[2];
            }
        }
    }

    function iuCalendar() {
        return {
            restrict:'EA',
            scope:{

            },
            require:['iuCalendar', '?ngModel'],
            controller:'IUCalendarController',
            templateUrl:'iu.directives.calendar.html',
            link: function (iScope, iEle, iAttrs, ctrls) {
                var calendarCtrl = ctrls[0],
                    ngModelCtrl = ctrls[1];

                var date = new Date();
                calendarCtrl.init(getYears(), ngModelCtrl);

                function getYears() {
                    var maxYear = date.getFullYear(),
                        minYear = 1900;
                    var y = [];
                    for (var i = maxYear; i >= minYear; i--) {
                        y.push(i);
                    }
                    return y;
                }
            }
        }
    }

})();