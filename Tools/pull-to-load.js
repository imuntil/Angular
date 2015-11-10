/**
 * Created by jtun02 on 15/10/23.
 */

;(function (window, document, undefined, $, IScroll) {

    var itemsPerPage = 10,
        scrollInProgress = false,
        myScroll,
        pullDownEl,
        pullUpEl,
        itemClass = 'ptl-item',
        currentPage = 1,
        refreshCallback,
        loadCallback,
        pullDownOffset,
        pullUpOffset;

    function PullToLoad (options, _refreshCallback, _loadCallback) {
        return (this instanceof PullToLoad)
            ? this.init(options, _refreshCallback, _loadCallback)
            : new PullToLoad(options, _refreshCallback, _loadCallback);
    }

    /**
     *
     * @param options
     * {pullUpEl:DOM,
     *  pullDownEl:DOM,
     *  itemsPerPage:number,
     *  itemClass:string
     *  }
     */

    PullToLoad.prototype.init = function (options, _refreshCallback, _loadCallback) {
        if (!options) return;
        options.pullUpEl   && (pullUpEl = options.pullUpEl);
        options.pullDownEl && (pullDownEl = options.pullDownEl);
        options.itemsPerPage && (itemsPerPage = options.itemsPerPage);
        options.itemClass && (itemClass = options.itemClass);

        refreshCallback = (typeof _refreshCallback) == 'function' ? _refreshCallback : function () {};
        loadCallback = (typeof _loadCallback) == 'function' ? _loadCallback : function () {};

        triggerMyScroll();
    };

    function loadContent(action) {
        if (action == 'load') {
            //load next page
            loadCallback(currentPage);
        } else {
            //refresh content
            refreshCallback();
        }

        myScroll.refresh();
        pullActionCallback();
    }

    function pullDownAction() {

        setTimeout(function () {
            loadContent('refresh');
        }, 500);

        currentPage = 1;
        $('#wrapper > .scroller').css({top:0});
    }

    function pullUpAction() {
        currentPage += 1;
        setTimeout(function () {
            loadContent('load');
        }, 500);
    }

    function pullActionCallback() {
        if (pullDownEl && pullDownEl.className.match('loading')) {

            pullDownEl.className = 'pullDown';
            pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh';

            myScroll.scrollTo(0, parseInt(pullUpOffset)*(-1), 200);

        } else if (pullUpEl && pullUpEl.className.match('loading')) {

            pullUpEl.className = 'pullUp';
            pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load';

        }
    }


    function triggerMyScroll(offset) {

        pullDownOffset = pullDownEl ? pullDownEl.offsetHeight : 0;
        pullUpOffset = pullUpEl ? pullUpEl.offsetHeight : 0;

        if ($('#wrapper').find('.' + itemClass).size() < itemsPerPage) {
            $(pullDownEl).hide();
            $(pullUpEl).hide();
            offset = 0;
        } else if (!offset) {
            offset = pullDownOffset;
        }

        myScroll = new IScroll('#wrapper', {
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

            if ($('#wrapper').find('.' + itemClass).size() >= itemsPerPage) {

                if (this.y >= 5 && pullDownEl && !pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'pullDown flip';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh';
                    this.minScrollY = 0;
                }
                if (this.y < this.maxScrollY && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'pullUp flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to load';
                }
            }
        });

        myScroll.on('scrollEnd', function () {
            setTimeout(function () {
                scrollInProgress = false;
            }, 100);
            if ($('#wrapper').find('.' + itemClass).size() >= itemsPerPage) {
                if (pullDownEl && pullDownEl.className.match('flip')) {
                    pullDownEl.className = 'pullDown loading';
                    pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';
                    pullDownAction();
                }
                else if (pullUpEl && pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'pullUp loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'loading';
                    pullUpAction();
                }
            }
        });


        setTimeout(function () {
            $('#wrapper').css({left:0});
        }, 100);
    }

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);


    window.PTL = PullToLoad;

})(window, document, undefined, $, IScroll);