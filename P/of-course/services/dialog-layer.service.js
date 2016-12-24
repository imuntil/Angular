/**
 * Created by 斌 on 2016/12/15.
 */
(function () {
    "use strict";
    angular.module('oc.services.dialogLayer',[
        'ngDialog'
    ])
        .factory('DialogLayer', DialogLayer);

    DialogLayer.$inject = ['ngDialog'];
    function DialogLayer(ngDialog) {
        return {
            openTimed: function (message, time, callback) {
                var dialog = ngDialog.open({
                    template:'<p class="nd-custom">' + message + '</p>',
                    plain:true,
                    closeByDocument:false,
                    closeByEscape:false,
                    showClose:false
                });
                setTimeout(function () {
                    dialog.close();
                    callback && callback();
                }, time || 1500);
            }
        }
    }
})();