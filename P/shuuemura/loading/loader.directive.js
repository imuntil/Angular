/**
 * Created by jtun02 on 15/12/14.
 */
(function () {
    angular.module('iu.directives.loader', [])
        .directive('loader', loader)
        .controller('LoaderController', LoaderController);

    LoaderController.$inject = ['$scope', '$timeout'];
    function LoaderController($scope, $timeout) {

        var loader = new createjs.LoadQueue(false);
        loader.on('complete', loadComplete);
        loader.on('progress', loading);
        loader.loadManifest(getMainfest(), true);

        function getMainfest() {
            var mf = [];
            for (var i = 0; i <= 45; i ++) {
                var img = 'star00' + (i > 9 ? i : '0' + i);
                mf.push({
                    id:img,
                    src:'test-imgs/'+img+'.jpg'
                });
            }
            return mf;
        }
        function loadComplete() {
            $scope.complete();
        }
        function loading() {
            $timeout(function () {
                $scope.progress = Math.floor(loader.progress*100)+"%";
            }, 0);
        }

    }

    function loader() {
        return {
            restrict:'A',
            scope:{
                complete:'&',
                progress:'='
            },
            controller:LoaderController
        }
    }
})();