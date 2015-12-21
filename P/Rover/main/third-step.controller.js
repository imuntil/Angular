/**
 * Created by jtun02 on 15/12/21.
 */
define(
    ['angular', 'localData', 'courseData'],
    function (angular) {
        "use strict";

        ThirdStepController.$inject = ['$stateParams', 'localData', 'CD', 'SRC'];
        function ThirdStepController($stateParams, localData, CD, SRC) {
            var vm = this;
            vm.section = parseInt($stateParams.section, 10);
            var cd = CD[vm.section - 1];

            active();
            function active() {
                localData.check(vm.section, 3);
                vm.practices = cd['section-3'].map(function (item, index) {
                    var practice = {
                        text:item.text,
                        style:{
                            'background-image':'url("'+SRC+'pics/'+item.pic+'")'
                        }
                    };
                    return practice;
                })
            }
        }
        angular.module('app.controllers.ThirdStepController', [
            'app.services.localData',
            'app.services.courseData'
        ])
            .controller('ThirdStepController', ThirdStepController);
    }
);