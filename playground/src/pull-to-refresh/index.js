/* eslint-disable */
import React, { useRef, useEffect } from 'react';

var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = -1] = "UP";
    DIRECTION[DIRECTION["DOWN"] = 1] = "DOWN";
})(DIRECTION || (DIRECTION = {}));

function isOverflowScrollable(element) {
    var overflowType = getComputedStyle(element).overflowY;
    if (element === document.scrollingElement && overflowType === 'visible') {
        return true;
    }
    if (overflowType !== 'scroll' && overflowType !== 'auto') {
        return false;
    }
    return true;
}
function isScrollable(element, direction) {
    if (!isOverflowScrollable(element)) {
        return false;
    }
    if (direction === DIRECTION.DOWN) {
        var bottomScroll = element.scrollTop + element.clientHeight;
        return bottomScroll < element.scrollHeight;
    }
    if (direction === DIRECTION.UP) {
        return element.scrollTop > 0;
    }
    throw new Error('unsupported direction');
}
/**
 * Returns whether a given element or any of its ancestors (up to rootElement) is scrollable in a given direction.
 */
function isTreeScrollable(element, direction) {
    if (isScrollable(element, direction)) {
        return true;
    }
    if (element.parentElement == null) {
        return false;
    }
    return isTreeScrollable(element.parentElement, direction);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".lds-ellipsis {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px;\n}\n.lds-ellipsis div {\n  position: absolute;\n  top: 27px;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  background: rgb(54, 54, 54);\n  animation-timing-function: cubic-bezier(0, 1, 1, 0);\n}\n.lds-ellipsis div:nth-child(1) {\n  left: 6px;\n  animation: lds-ellipsis1 0.6s infinite;\n}\n.lds-ellipsis div:nth-child(2) {\n  left: 6px;\n  animation: lds-ellipsis2 0.6s infinite;\n}\n.lds-ellipsis div:nth-child(3) {\n  left: 26px;\n  animation: lds-ellipsis2 0.6s infinite;\n}\n.lds-ellipsis div:nth-child(4) {\n  left: 45px;\n  animation: lds-ellipsis3 0.6s infinite;\n}\n@keyframes lds-ellipsis1 {\n  0% {\n    transform: scale(0);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n@keyframes lds-ellipsis3 {\n  0% {\n    transform: scale(1);\n  }\n  100% {\n    transform: scale(0);\n  }\n}\n@keyframes lds-ellipsis2 {\n  0% {\n    transform: translate(0, 0);\n  }\n  100% {\n    transform: translate(19px, 0);\n  }\n}\n";
styleInject(css_248z);

// Source: https://loading.io/css/
var RefreshingContent = function () {
    return (React.createElement("div", { className: "lds-ellipsis" },
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement("div", null)));
};

var PullingContent = function () {
    return (React.createElement("div", null,
        React.createElement("p", null, "\u21A7\u00A0\u00A0pull to refresh\u00A0\u00A0\u21A7")));
};

var css_248z$1 = ".ptr,\n.ptr__children {\n  height: 100%;\n  width: 100%;\n  /* // overflow: hidden; */\n  -webkit-overflow-scrolling: touch;\n  position: relative;\n}\n\n.ptr {\n  &.ptr--fetch-more-treshold-breached {\n    .ptr__fetch-more {\n      display: block;\n    }\n  }\n}\n\n.ptr__fetch-more {\n  display: none;\n}\n\n/**\n  * Pull down transition \n  */\n.ptr__children,\n.ptr__pull-down {\n  transition: transform 0.2s cubic-bezier(0, 0, 0.31, 1);\n}\n\n.ptr__pull-down {\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  right: 0;\n  top: 0;\n  visibility: hidden;\n  > div {\n    display: none;\n  }\n}\n\n.ptr--dragging {\n  /**\n    * Hide PullMore content is treshold breached\n    */\n  &.ptr--pull-down-treshold-breached {\n    .ptr__pull-down--pull-more {\n      display: none;\n    }\n  }\n  /**\n    * Otherwize, display content\n    */\n  .ptr__pull-down--pull-more {\n    display: block;\n  }\n}\n\n.ptr--pull-down-treshold-breached {\n  /**\n    * Force opacity to 1 is pull down trashold breached\n    */\n  .ptr__pull-down {\n    opacity: 1 !important;\n  }\n  /**\n    * And display loader\n    */\n  .ptr__pull-down--loading {\n    display: block;\n  }\n}\n\n.ptr__loader {\n  margin: 0 auto;\n  text-align: center;\n}\n";
styleInject(css_248z$1);

var PullToRefresh = function (_a) {
    var _b = _a.isPullable, isPullable = _b === void 0 ? true : _b, _c = _a.canFetchMore, canFetchMore = _c === void 0 ? false : _c, onRefresh = _a.onRefresh, onFetchMore = _a.onFetchMore, _d = _a.refreshingContent, refreshingContent = _d === void 0 ? React.createElement(RefreshingContent, null) : _d, _e = _a.pullingContent, pullingContent = _e === void 0 ? React.createElement(PullingContent, null) : _e, children = _a.children, _f = _a.pullDownThreshold, pullDownThreshold = _f === void 0 ? 67 : _f, _g = _a.fetchMoreThreshold, fetchMoreThreshold = _g === void 0 ? 100 : _g, _h = _a.maxPullDownDistance, maxPullDownDistance = _h === void 0 ? 95 : _h, // max distance to scroll to trigger refresh
    _j = _a.resistance, // max distance to scroll to trigger refresh
    resistance = _j === void 0 ? 1 : _j, backgroundColor = _a.backgroundColor, _k = _a.className, className = _k === void 0 ? '' : _k;
    var containerRef = useRef(null);
    var childrenRef = useRef(null);
    var pullDownRef = useRef(null);
    var fetchMoreRef = useRef(null);
    var pullToRefreshThresholdBreached = false;
    var fetchMoreTresholdBreached = false; // if true, fetchMore loader is displayed
    var isDragging = false;
    var startY = 0;
    var currentY = 0;
    useEffect(function () {
        if (!isPullable || !childrenRef || !childrenRef.current)
            return;
        var childrenEl = childrenRef.current;
        childrenEl.addEventListener('touchstart', onTouchStart, { passive: true });
        childrenEl.addEventListener('mousedown', onTouchStart);
        childrenEl.addEventListener('touchmove', onTouchMove, { passive: false });
        childrenEl.addEventListener('mousemove', onTouchMove);
        window.addEventListener('scroll', onScroll);
        childrenEl.addEventListener('touchend', onEnd);
        childrenEl.addEventListener('mouseup', onEnd);
        document.body.addEventListener('mouseleave', onEnd);
        return function () {
            childrenEl.removeEventListener('touchstart', onTouchStart);
            childrenEl.removeEventListener('mousedown', onTouchStart);
            childrenEl.removeEventListener('touchmove', onTouchMove);
            childrenEl.removeEventListener('mousemove', onTouchMove);
            window.removeEventListener('scroll', onScroll);
            childrenEl.removeEventListener('touchend', onEnd);
            childrenEl.removeEventListener('mouseup', onEnd);
            document.body.removeEventListener('mouseleave', onEnd);
        };
    }, [
        children,
        isPullable,
        onRefresh,
        pullDownThreshold,
        maxPullDownDistance,
        canFetchMore,
        fetchMoreThreshold,
    ]);
    /**
     * Check onMount / canFetchMore becomes true
     *  if fetchMoreThreshold is already breached
     */
    useEffect(function () {
        var _a;
        /**
         * Check if it is already in fetching more state
         */
        if (!((_a = containerRef) === null || _a === void 0 ? void 0 : _a.current))
            return;
        var isAlreadyFetchingMore = containerRef.current.classList.contains('ptr--fetch-more-treshold-breached');
        if (isAlreadyFetchingMore)
            return;
        /**
         * Proceed
         */
        if (canFetchMore && getScrollToBottomValue() < fetchMoreThreshold && onFetchMore) {
            containerRef.current.classList.add('ptr--fetch-more-treshold-breached');
            fetchMoreTresholdBreached = true;
            onFetchMore().then(initContainer).catch(initContainer);
        }
    }, [canFetchMore, children]);
    /**
     * Returns distance to bottom of the container
     */
    var getScrollToBottomValue = function () {
        if (!childrenRef || !childrenRef.current)
            return -1;
        var scrollTop = window.scrollY; // is the pixels hidden in top due to the scroll. With no scroll its value is 0.
        var scrollHeight = childrenRef.current.scrollHeight; // is the pixels of the whole container
        return scrollHeight - scrollTop - window.innerHeight;
    };
    var initContainer = function () {
        requestAnimationFrame(function () {
            /**
             * Reset Styles
             */
            if (childrenRef.current) {
                childrenRef.current.style.overflowX = 'initial';
                childrenRef.current.style.overflowY = 'initial';
                childrenRef.current.style.transform = "translate(0px, 0px)";
            }
            if (pullDownRef.current) {
                pullDownRef.current.style.opacity = '0';
            }
            if (containerRef.current) {
                containerRef.current.classList.remove('ptr--pull-down-treshold-breached');
                containerRef.current.classList.remove('ptr--dragging');
                containerRef.current.classList.remove('ptr--fetch-more-treshold-breached');
            }
            if (pullToRefreshThresholdBreached)
                pullToRefreshThresholdBreached = false;
            if (fetchMoreTresholdBreached)
                fetchMoreTresholdBreached = false;
        });
    };
    var onTouchStart = function (e) {
        isDragging = false;
        if (e instanceof MouseEvent) {
            startY = e.pageY;
        }
        if (window.TouchEvent && e instanceof TouchEvent) {
            startY = e.touches[0].pageY;
        }
        currentY = startY;
        // Check if element can be scrolled
        if (e.type === 'touchstart' && isTreeScrollable(e.target, DIRECTION.UP)) {
            return;
        }
        // Top non visible so cancel
        if (childrenRef.current.getBoundingClientRect().top < 0) {
            return;
        }
        isDragging = true;
    };
    var onTouchMove = function (e) {
        if (!isDragging) {
            return;
        }
        if (window.TouchEvent && e instanceof TouchEvent) {
            currentY = e.touches[0].pageY;
        }
        else {
            currentY = e.pageY;
        }
        containerRef.current.classList.add('ptr--dragging');
        if (currentY < startY) {
            isDragging = false;
            return;
        }
        if (e.cancelable) {
            e.preventDefault();
        }
        var yDistanceMoved = Math.min((currentY - startY) / resistance, maxPullDownDistance);
        // Limit to trigger refresh has been breached
        if (yDistanceMoved >= pullDownThreshold) {
            isDragging = true;
            pullToRefreshThresholdBreached = true;
            containerRef.current.classList.remove('ptr--dragging');
            containerRef.current.classList.add('ptr--pull-down-treshold-breached');
        }
        // maxPullDownDistance breached, stop the animation
        if (yDistanceMoved >= maxPullDownDistance) {
            return;
        }
        pullDownRef.current.style.opacity = (yDistanceMoved / 65).toString();
        childrenRef.current.style.overflow = 'visible';
        childrenRef.current.style.transform = "translate(0px, " + yDistanceMoved + "px)";
        pullDownRef.current.style.visibility = 'visible';
    };
    var onScroll = function (e) {
        /**
         * Check if component has already called onFetchMore
         */
        if (fetchMoreTresholdBreached)
            return;
        /**
         * Check if user breached fetchMoreThreshold
         */
        if (canFetchMore && getScrollToBottomValue() < fetchMoreThreshold && onFetchMore) {
            fetchMoreTresholdBreached = true;
            containerRef.current.classList.add('ptr--fetch-more-treshold-breached');
            onFetchMore().then(initContainer).catch(initContainer);
        }
    };
    var onEnd = function () {
        isDragging = false;
        startY = 0;
        currentY = 0;
        // Container has not been dragged enough, put it back to it's initial state
        if (!pullToRefreshThresholdBreached) {
            if (pullDownRef.current)
                pullDownRef.current.style.visibility = 'hidden';
            initContainer();
            return;
        }
        if (childrenRef.current) {
            childrenRef.current.style.overflow = 'visible';
            childrenRef.current.style.transform = "translate(0px, " + pullDownThreshold + "px)";
        }
        onRefresh().then(initContainer).catch(initContainer);
    };
    return (React.createElement("div", { className: "ptr " + className, style: { backgroundColor: backgroundColor }, ref: containerRef },
        React.createElement("div", { className: "ptr__pull-down", ref: pullDownRef },
            React.createElement("div", { className: "ptr__loader ptr__pull-down--loading" }, refreshingContent),
            React.createElement("div", { className: "ptr__pull-down--pull-more" }, pullingContent)),
        React.createElement("div", { className: "ptr__children", ref: childrenRef },
            children,
            React.createElement("div", { className: "ptr__fetch-more", ref: fetchMoreRef },
                React.createElement("div", { className: "ptr__loader ptr__fetch-more--loading" }, refreshingContent)))));
};

export default PullToRefresh;
