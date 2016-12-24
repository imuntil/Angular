/**
 * Created by 斌 on 2016/12/12.
 */
(function () {
    "use strict";
    angular.module('oc.directives.floatBar', [])
        .directive('floatBar', floatBar);

    floatBar.$inject = ['$timeout'];
    function floatBar($timeout) {
        return {
            restrict:'EA',
            replace:true,
            scope:{
                items:'='
            },
            templateUrl:'directives/float-bar.directive.html',
            link: function (iScope, iEle, iAttrs) {
                var fb = $(iEle),
                    fh = fb.height() | 0,
                    ft = undefined,
                    fixed = false;
                fb[0] && (ft = fb.offset().top);
                iScope.jump = jump;
                iScope.barStyle = {};
                iScope.activeIndex = undefined;
                iScope.intervals = [];

                function barInterval() {
                    iScope.intervals =
                        iScope.items.map(function (_item, _index) {
                            var _ele = $('.' + _item['_class']),
                                _top = _ele.offset().top | 0;
                            return [_top, _top + _ele.height() | 0];
                        });
                }

                function jump(_class, index) {
                    barInterval();

                    var _top = iScope.intervals[index][0];
                    if (index === 0) {

                    }
                    //var _top = $('.' + _class).offset().top | 0;
                    $("body,html").animate({"scrollTop": index === 0 ? _top + 10 : _top - fh + 10},500, function () {
                        iScope.$apply(function () {
                            iScope.activeIndex = index;
                        });
                    });
                }

                $(document).scroll(function () {
                    iScope.$apply(scroll);
                });

                function scroll() {
                    var dt = $(document).scrollTop() | 0;
                    try {
                        if (dt >= ft) {
                            iScope.barStyle = {'position': 'fixed', 'top':'0'};
                            fixed = true;

                            iScope.activeIndex = undefined;
                            iScope.intervals.forEach(function (_item, _index) {
                                if (dt + fh >= _item[0] && dt + fh < _item[1]) {
                                    iScope.activeIndex = _index;
                                }
                            });
                        }

                        if (dt < ft) {
                            iScope.barStyle = {'position':'absolute', 'top':undefined};
                            fixed = false;
                            iScope.activeIndex = undefined;
                        }
                    } catch (e) {

                    }
                }

                $timeout(function () {
                    barInterval();
                    scroll();
                }, 100);
                //barInterval();
                //scroll();
                iScope.$on('scrollTop:changed', barInterval);
            }
        }
    }
})();