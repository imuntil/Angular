/**
 * Created by 斌 on 2016/12/15.
 */
(function () {
    "use strict";
    angular.module('oc.UserInfoController', [
        'oc.directives.customRadio',
        'app.directives.phoneNumberValidate',
        'angularFileUpload',
        'app.directives.ngThumb',

        'app.services.citiesData'
    ])
        .controller('UserInfoController', UserInfoController);


    UserInfoController.$inject = ['citiesData', 'FileUploader'];
    function UserInfoController(citiesData, FileUploader) {
        var vm = this;
        vm.user = {
            email:'imuntil@qq.com',
            nickname:'zhin',
            gender:'男',
            mobile:'13567890987',
            condition: '不在职',
            QQ:undefined
        };
        vm.citiesData = citiesData;
        vm.editing = false;
        vm.base64s = [];

        var uploader = vm.uploader = new FileUploader({ });

        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
            if (uploader.queue.length > 1) {
                uploader.queue[0].remove();
            }
        };
    }
})();