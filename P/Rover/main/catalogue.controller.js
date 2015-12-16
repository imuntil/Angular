/**
 * Created by 斌 on 2015/12/15.
 */
define(
    ['angular', 'localData'],
    function (angular) {
        "use strict";

        CatalogueController.$inject = ['localData', '$state'];
        function CatalogueController(localData, $state) {
            var vm = this;
            vm.data = localData.fetch();
            vm.go = go;

            function go(course) {
                if (course < vm.data.course) {
                    return;
                }
                $state.go('home.step-1',{section:course});
            }
        }
        angular.module('app.controllers.CatalogueController', [])
            .controller('CatalogueController', CatalogueController);
    }
);