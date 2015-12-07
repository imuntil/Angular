/**
 * Created by 斌 on 2015/12/5.
 */
(function () {
    "use strict";

    angular.module('iu.directives.calendar', [])
        //.controller('IUCalendarController', IUCalendarController)
        .directive('iuCalendar', iuCalendar);
    function iuCalendar() {
        return {
            restrict:'EA',
            scope:{
                date:'='
            },
            templateUrl:'iu.directives.calendar.html',
            link: function (iScope, iEle, iAttrs) {
                var date = new Date();

                iScope.years = getYears();
                iScope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
                function getYears() {
                    var maxYear = date.getFullYear(),
                        minYear = 1900;
                    var y = [];
                    for (var i = maxYear; i >= minYear; i--) {
                        y.push(i);
                    }
                    return y;
                }
                function getDays() {

                    var daysInMonth = new Date(iScope.defYear, iScope.defMonth, 0).getDate();
                    var ds = [];
                    for (var d = 1; d <= daysInMonth; d++) {
                        ds.push(d);
                    }
                    iScope.days = ds;

                    if (iScope.defDay > daysInMonth) {
                        iScope.defDay = daysInMonth;
                    }
                }
                function selectDate() {
                    iScope.date = iScope.defYear + '-' + iScope.defMonth + '-' + iScope.defDay;
                }
                function toDay() {
                    var _d = new Date();
                    iScope.defYear = _d.getFullYear();
                    iScope.defMonth = _d.getMonth() + 1;
                    getDays();
                    iScope.defDay = _d.getDate();
                    selectDate();
                }
                function setDay() {
                    var _d = iScope.date.split('-').map(function (item) {
                        return parseInt(item, 10) || 1;
                    });
                    iScope.defYear = _d[0];
                    iScope.defMonth = _d[1];
                    iScope.defDay = _d[2];
                    getDays();
                }

                iScope.$watch('date', function (ov, nv) {
                    if (nv === undefined) {
                        toDay();
                    } else if (ov !== nv) {
                        setDay();
                    }
                });
                iScope.$watch('defYear', function () {
                    getDays();
                    selectDate();
                });
                iScope.$watch('defMonth', function () {
                    getDays();
                    selectDate();
                });
                iScope.$watch('defDay', function () {
                    selectDate();
                });
            }
        }
    }
    //IUCalendarController.$inject = ['$scope'];
    //function IUCalendarController($scope) {
    //    var self = this,
    //        ngModelCtrl = {$setViewValue: angular.noop};
    //    this.init = function (years_, ngModelCtrl_) {
    //        ngModelCtrl = ngModelCtrl_;
    //        ngModelCtrl.$render = function () {
    //            self.render();
    //        };
    //
    //        $scope.years = years_;
    //        $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
    //
    //        $scope.$watch('defYear', function (ov, nv) {
    //            self.getDays();
    //        });
    //        $scope.$watch('defMonth', function (ov, nv) {
    //            self.getDays();
    //        });
    //        $scope.$watch('defDay', function () {
    //            selectDate();
    //        });
    //    };
    //    this.getDays = function () {
    //
    //        var daysInMonth = new Date($scope.defYear, $scope.defMonth, 0).getDate();
    //        var ds = [];
    //        for (var d = 1; d <= daysInMonth; d++) {
    //            ds.push(d);
    //        }
    //        $scope.days = ds;
    //
    //        if ($scope.defDay > daysInMonth) {
    //            $scope.defDay = daysInMonth;
    //        }
    //        selectDate();
    //    };
    //    this.render = function () {
    //        $scope.date = ngModelCtrl.$viewValue;
    //    };
    //    function selectDate() {
    //        ngModelCtrl.$setViewValue($scope.defYear + '-' + $scope.defMonth + '-' + $scope.defDay);
    //        ngModelCtrl.$render();
    //    }
    //    function toDay() {
    //        var _d = new Date();
    //        $scope.defYear = _d.getFullYear();
    //        $scope.defMonth = _d.getMonth() + 1;
    //        $scope.defDay = _d.getDate();
    //    }
    //    function initDay() {
    //        if($scope.date === undefined) {
    //            toDay();
    //        } else {
    //            var _d = $scope.date.split('-').map(function (item) {
    //                return parseInt(item, 10) || 1;
    //            });
    //            //console.log(_d);
    //            $scope.defYear = _d[0];
    //            $scope.defMonth = _d[1];
    //            $scope.defDay = _d[2];
    //        }
    //    }
    //}



})();