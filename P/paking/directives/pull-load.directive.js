/**
 * Created by 斌 on 2015/11/10.
 */
(function () {
    angular.module('app.directives.pullLoad', [])
        .directive('pullLoad', pullLoad)
        .directive('pullLoadItem', pullLoadItem);

    function pullLoad() {

        return {
            restrict:'EA',
            transclude:true,
            templateUrl:'directives/pull-load.directive.html',
            replace:true,
            scope:{
                canRefresh:'=',
                itemsPerPage:'@',
                itemClass:'@',
                loadMore:'&',
                loadRefresh:'&',
                refresh:'&'
            },
            controller:PullLoadController,
            link: function (iScope, iEle, iAttrs) {

                var pullUpEl = $(iEle).find('.pullUp'),
                    pullDownEl = undefined,
                    itemsPerPage = iScope.itemsPerPage || 8,
                    pullDownOffset = undefined,
                    pullUpOffset = undefined,
                    myScroll = undefined,
                    scrollInProgress = false,
                    currentPage = 1,
                    itemClass = iScope.itemClass || 'ptl-item';
                if (angular.isDefined(iAttrs.canRefresh) && iScope.$eval(iAttrs.canRefresh)) {
                    pullDownEl = $(iEle).find('.pullDown');
                }

                function triggerMyScroll(offset) {

                    pullDownOffset = pullDownEl ? pullDownEl[0].offsetHeight : 0;
                    pullUpOffset = pullUpEl ? pullUpEl[0].offsetHeight : 0;

                    if ($(iEle).find('.' + itemClass).size() < itemsPerPage) {
                        pullUpEl.hide();
                        pullDownEl && pullDownEl.hide();
                        offset = 0;
                    } else if (!offset) {
                        offset = pullDownOffset;
                    }

                    myScroll = new IScroll(iEle[0], {
                        probeType:1,
                        tap:true,
                        click:false,
                        preventDefaultException:{tagName: /.*/},
                        scrollbars:true,
                        fadeScrollbars:true,
                        interactiveScrollbars:false,
                        keyBindings:false,
                        deceleration:0.0002,
                        startY:(parseInt(offset) * (-1))
                    });

                    myScroll.on('scrollStart', function () {
                        scrollInProgress = true;
                    });
                    myScroll.on('scroll', function () {
                        scrollInProgress = true;

                        if ($(iEle).find('.' + itemClass).size() >= itemsPerPage) {
                            if (this.y > 5 && pullDownEl && !pullDownEl.is('.flip')) {
                                pullDownEl.attr('class', 'pullDown flip');
                                pullDownEl.find('.pullDownLabel').html('Release to refresh');
                            }
                            if (this.y < this.maxScrollY && !pullUpEl.is('.flip')) {
                                pullUpEl.attr('class', 'pullUp flip');
                                pullUpEl.find('.pullUpLabel').html('Release to load');
                            }
                        }
                    });
                    myScroll.on('scrollEnd', function () {
                        setTimeout(function () {
                            scrollInProgress = false;
                        }, 100);
                        if ($(iEle).find('.' + itemClass).size() >= itemsPerPage) {
                            if (pullDownEl && pullDownEl.is('.flip')) {
                                pullDownEl.attr('class', 'pullDown iscroll-loading');
                                pullDownEl.find('.pullDownLabel').html('Loading');
                                pullDownAction();
                            }
                            else if (pullUpEl && pullUpEl.is('.flip')) {
                                pullUpEl.attr('class', 'pullUp iscroll-loading');
                                pullUpEl.find('.pullUpLabel').html('iscroll-loading');
                                pullUpAction();
                            }
                        }
                    });
                }

                function pullDownAction() {
                    setTimeout(function () {
                        loadContent('refresh');
                    }, 500);
                    currentPage = 1;
                    $('.iscroll-wrapper > .iscroll-scroller').css({top:0});
                }

                function pullUpAction() {
                    currentPage += 1;
                    setTimeout(function () {
                        loadContent('load');
                    }, 500);
                }

                function loadContent(action) {
                    if (action === 'load') {
                        iScope.$apply(function () {
                            iScope.loadMore();
                        });
                    } else {
                        iScope.$apply(function () {
                            iScope.loadRefresh();
                        })
                    }

                    myScroll.refresh();
                    pullActionCallback();
                }

                function pullActionCallback() {
                    if (pullDownEl && pullDownEl.is('.iscroll-loading')) {
                        pullDownEl.attr('class', 'pullDown')
                            .find('.pullDownLabel').html('Pull down to refresh');
                        myScroll.scrollTo(0, parseInt(pullUpOffset)*(-1), 200);
                    } else if (pullUpEl && pullUpEl.is('.iscroll-loading')) {
                        pullUpEl.attr('class', 'pullUp')
                            .find('.pullUpLabel').html('Pull up to load');
                    }
                }

                setTimeout(triggerMyScroll, 200);
            }
        }
    }

    PullLoadController.$inject = ['$scope'];
    function PullLoadController($scope) {
        var vm = this;
        vm.addItem = addItem;
        vm.items = [];

        function addItem(itemScope) {
            vm.items.push(itemScope);
            itemScope.$on('$destroy', function () {
                removeItem(itemScope);
            });
        }
        function removeItem(item) {
            var index = vm.items.indexOf(item);
            if (index !== -1) {
                vm.items.splice(item, 1);
            }
        }
    }

    function pullLoadItem() {
        return {
            restrict:'EA',
            templateUrl:'directives/pull-load-item.directive.html',
            replace:true,
            require:'^pullLoad',
            scope:{
                proName:'=',
                proImgSrc:'=',
                headImgSrc:'=',
                proPrice:'=',
                params:'='
            },
            link: function (iScope, iEle, iAttrs, pullLoadCtrl) {
                pullLoadCtrl.addItem(iScope);
            }
        }
    }
})();