/**
 * Created by 斌 on 2016/12/8.
 */
(function () {
    "use strict";
    angular.module('oc.LoginController', [
        'app.directives.passwordValidate',
        'oc.services.userAction',

        'ngDialog'
    ])
        .controller('LoginController', LoginController);

    LoginController.$inject = ['userAction', 'ngDialog'];
    function LoginController(userAction, ngDialog) {
        var vm = this;
        vm.aniClass = 'ani-login';
        vm.userLogin = userLogin;
        
        function userLogin(valid) {
            if (!valid) {
                return;
            }
            userAction.login({email:vm.email, password:vm.password})
                .then(function (response) {
                    console.log(response);
                }, function (response) {
                    console.log(response);
                    openTimed(response);
                });
        }

        function openTimed(response) {
            var dialog = ngDialog.open({
                template:'<p class="nd-custom">code:'+(response && response.code !== undefined ? response.code : 0) +
                ' 网络故障，请稍后重试。</p>',
                plain:true,
                closeByDocument:false,
                closeByEscape:false,
                showClose:false
            });
            setTimeout(function () {
                dialog.close();
            }, 1500);
        }
    }
})();