/**
 * Created by jtun02 on 15/12/14.
 */
(function () {
    angular.module('iu.directives.slider', [])
        .directive('slider', slider);

    function slider($document, $window) {
        return {
            restrict:'A',
            link: function (iScope, iEle, iAttrs) {
                var df = iEle[0].offsetTop,
                    min = df - iScope.$eval(iAttrs.min),
                    max = df + iScope.$eval(iAttrs.max);
                var y, down = false;
                function start(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    down = true;
                    e = e || $window.event;
                    y = e.layerY || e.offsetY;
                    y -= $document[0].body.scrollTop;
                }
                function move(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!down) {
                        return;
                    }
                    e = e || $window.event;

                    var _top;
                    if (e.clientY - y > max) {
                        _top = max;
                    } else if (e.clientY - y < min) {
                        _top = min;
                    } else {
                        _top = e.clientY - y;
                    }

                    iEle[0].style.top = _top + 'px'
                }
                function end(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    down = false;
                }
                iEle.bind('mousedown', start);
                iEle.bind('mousemove', move);
                $document.bind('mouseup', end);
                iEle.bind('touchstart', start);
                iEle.bind('touchmove', move);
                $document.bind('touchend', end);
            }
        }
    }
})();