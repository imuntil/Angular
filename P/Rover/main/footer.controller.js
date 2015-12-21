/**
 * Created by 斌 on 2015/12/17.
 */
define(
    ['angular', 'localData'],
    function (angular) {

        FooterController.$inject = ['$scope', '$location', 'localData'];
        function FooterController($scope, $location, localData) {
            var vm = this;
            vm.counting = false;
            vm.next = next;
            vm.nextAble = nextAble;
            vm.prev = prev;
            vm.step = 1;
            var data = localData.fetch();
            var footers = ['第一部分.视频','第二部分.小测试','第三部分.最佳实践','第四部分.自我评估'];
            var url = $location.url();

            $scope.$on('$locationChangeSuccess', function (event, nu, ou, ns, os) {
                //console.info('event:', event);
                //console.info('new url:', nu);
                //console.info('old url:', ou);
                //console.info('new state:', ns);
                //console.info('old state:', os);
                //console.info('url:', $location.url());
                //console.info('path:', $location.path());
                //console.info('search;', $location.search());
                //console.info('hash:', $location.hash());

                url = $location.url();
                if (url === '/home') {
                    vm.counting = false;
                } else {
                    vm.counting = true;
                    count();
                }
            });
            if (url !== '/home') {
                vm.counting = true;
                count();
            }
            function count() {
                vm.step = parseInt(url.substr(-1), 10) || 1;
                vm.section = parseInt(url.substr(6, 1), 10) || 1;
                vm.footer = footers[vm.step - 1];
            }
            function prev() {
                if (vm.step === 1) {return;}
                var l = url.length,
                    n_url = url.substring(0, l-1) + (vm.step - 1);
                $location.url(n_url);
            }
            function next() {
                if (!nextAble()) {return;}

                var l = url.length,
                    n_url = url.substring(0, l-1) + (vm.step + 1);
                $location.url(n_url);
            }
            function nextAble() {
                if (vm.step === 4) {return false;}
                if (vm.section > data.course) {return false;}
                if (vm.section === data.course && vm.step >= data.step) {return false;}
                return true;
            }
        }

        angular.module('app.controllers.FooterController', [
            'app.services.localData'
        ])
            .controller('FooterController', FooterController);
    }
);