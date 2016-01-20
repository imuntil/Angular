/**
 * Created by 斌 on 2016/1/19.
 */
(function () {
    "use strict";
    angular.module('app.JoinController', [
        'app.services.JC'
    ])
        .controller('JoinController', JoinController)
        .value('tempValue', {
            submit:false
        })
        .factory('tempService', ['$timeout', 'tempValue', function ($timeout, tempValue) {
            return {
                timeLimit: function (time) {
                    if (tempValue.submit) {
                        return;
                    }
                    tempValue.submit = true;
                    $timeout(function () {
                        tempValue.submit = false;
                    }, time);
                }
            }
        }]);

    JoinController.$inject = ['tempValue', 'tempService', '$timeout', 'JC'];
    function JoinController(tempValue, tempService, $timeout, JC) {
        var vm = this;
        vm.f = {
            sex:1
        };
        vm.join = join;
        vm.tL = tempValue;

        function join(valid) {
            if (!valid) {
                tempService.timeLimit(1000);
                return;
            }
            JC.join(vm.f).then(function (data) {
                console.log(data);
            });
        }
    }
})();