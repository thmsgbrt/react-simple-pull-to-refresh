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

var css = ".lds-ellipsis {\n  display: inline-block;\n  position: relative;\n  width: 64px;\n  height: 64px; }\n\n.lds-ellipsis div {\n  position: absolute;\n  top: 27px;\n  width: 11px;\n  height: 11px;\n  border-radius: 50%;\n  background: #363636;\n  animation-timing-function: cubic-bezier(0, 1, 1, 0); }\n\n.lds-ellipsis div:nth-child(1) {\n  left: 6px;\n  animation: lds-ellipsis1 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(2) {\n  left: 6px;\n  animation: lds-ellipsis2 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(3) {\n  left: 26px;\n  animation: lds-ellipsis2 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(4) {\n  left: 45px;\n  animation: lds-ellipsis3 0.6s infinite; }\n\n@keyframes lds-ellipsis1 {\n  0% {\n    transform: scale(0); }\n  100% {\n    transform: scale(1); } }\n\n@keyframes lds-ellipsis3 {\n  0% {\n    transform: scale(1); }\n  100% {\n    transform: scale(0); } }\n\n@keyframes lds-ellipsis2 {\n  0% {\n    transform: translate(0, 0); }\n  100% {\n    transform: translate(19px, 0); } }\n";
styleInject(css);

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

var css$1 = ".ptr,\n.ptr__children {\n  height: 100%;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  position: relative;\n  z-index: 1; }\n\n.ptr__children,\n.ptr__pull-down {\n  transition: transform 0.2s cubic-bezier(0, 0, 0.31, 1); }\n\n.ptr__pull-down {\n  position: absolute;\n  overflow: hidden;\n  left: 0;\n  right: 0;\n  top: 0;\n  visibility: hidden;\n  text-align: center; }\n  .ptr__pull-down > div {\n    margin: 0 auto; }\n  .ptr__pull-down > .ptr__pull-down--loading {\n    display: none;\n    text-align: center;\n    margin: 0 auto; }\n  .ptr__pull-down > .ptr__pull-down--pull-more {\n    display: none;\n    text-align: center;\n    margin: 0 auto; }\n\n.ptr--dragging.ptr--treshold-breached .ptr__pull-down--pull-more {\n  display: none; }\n\n.ptr--dragging .ptr__pull-down--pull-more {\n  display: block; }\n\n.ptr--treshold-breached .ptr__pull-down {\n  opacity: 1 !important; }\n\n.ptr--treshold-breached .ptr__pull-down--loading {\n  display: block; }\n";
styleInject(css$1);

var PullToRefresh = function (_a) {
    var _b = _a.refreshingContent, refreshingContent = _b === void 0 ? React.createElement(RefreshingContent, null) : _b, _c = _a.pullingContent, pullingContent = _c === void 0 ? React.createElement(PullingContent, null) : _c, _d = _a.pullDownThreshold, pullDownThreshold = _d === void 0 ? 67 : _d, _e = _a.maxPullDownDistance, maxPullDownDistance = _e === void 0 ? 95 : _e, // max distance to scroll to trigger refresh
    onRefresh = _a.onRefresh, backgroundColor = _a.backgroundColor, _f = _a.isPullable, isPullable = _f === void 0 ? true : _f, children = _a.children, _g = _a.className, className = _g === void 0 ? '' : _g;
    var containerRef = useRef(null);
    var childrenRef = useRef(null);
    var pullDownRef = useRef(null);
    var pullToRefreshThresholdBreached = false;
    var isDragging = false;
    var startY = 0;
    var currentY = 0;
    useEffect(function () {
        if (!isPullable || !childrenRef || !childrenRef.current)
            return;
        childrenRef.current.addEventListener('touchstart', onTouchStart, { passive: true });
        childrenRef.current.addEventListener('mousedown', onTouchStart);
        childrenRef.current.addEventListener('touchmove', onTouchMove, { passive: false });
        childrenRef.current.addEventListener('mousemove', onTouchMove);
        childrenRef.current.addEventListener('touchend', onEnd);
        childrenRef.current.addEventListener('mouseup', onEnd);
        document.body.addEventListener('mouseleave', onEnd);
        return function () {
            if (!isPullable || !childrenRef || !childrenRef.current)
                return;
            childrenRef.current.removeEventListener('touchstart', onTouchStart);
            childrenRef.current.removeEventListener('mousedown', onTouchStart);
            childrenRef.current.removeEventListener('touchmove', onTouchMove);
            childrenRef.current.removeEventListener('mousemove', onTouchMove);
            childrenRef.current.removeEventListener('touchend', onEnd);
            childrenRef.current.removeEventListener('mouseup', onEnd);
            document.body.removeEventListener('mouseleave', onEnd);
        };
    }, [isPullable]);
    useEffect(function () {
        initContainer();
    }, [children]);
    var initContainer = function () {
        requestAnimationFrame(function () {
            if (childrenRef.current) {
                childrenRef.current.style.overflowX = 'hidden';
                childrenRef.current.style.overflowY = 'auto';
                // childrenRef.current.style.overflow = 'auto';
                childrenRef.current.style.transform = "translate(0px, 0px)";
            }
            if (pullDownRef.current) {
                pullDownRef.current.style.opacity = '0';
            }
            if (containerRef.current) {
                containerRef.current.classList.remove('ptr--treshold-breached');
                containerRef.current.classList.remove('ptr--dragging');
            }
        });
    };
    var onTouchStart = function (e) {
        isDragging = false;
        if (e instanceof MouseEvent) {
            startY = e.pageY;
        }
        if (e instanceof TouchEvent) {
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
        if (e instanceof TouchEvent) {
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
        // Limit to trigger refresh has been breached
        if (currentY - startY >= pullDownThreshold) {
            isDragging = true;
            pullToRefreshThresholdBreached = true;
            containerRef.current.classList.remove('ptr--dragging');
            containerRef.current.classList.add('ptr--treshold-breached');
        }
        else {
            pullToRefreshThresholdBreached = false;
            containerRef.current.classList.remove('ptr--treshold-breached');
        }
        // maxPullDownDistance breached, stop the animation
        if (currentY - startY > maxPullDownDistance) {
            return;
        }
        pullDownRef.current.style.opacity = ((currentY - startY) / 65).toString();
        childrenRef.current.style.overflow = 'visible';
        childrenRef.current.style.transform = "translate(0px, " + (currentY - startY) + "px)";
        pullDownRef.current.style.visibility = 'visible';
    };
    var onEnd = function () {
        isDragging = false;
        startY = 0;
        currentY = 0;
        // Container has not been dragged enough, put it back to it's initial state
        if (!pullToRefreshThresholdBreached) {
            pullDownRef.current.style.visibility = 'hidden';
            initContainer();
            return;
        }
        childrenRef.current.style.overflow = 'visible';
        childrenRef.current.style.transform = "translate(0px, " + pullDownThreshold + "px)";
        pullToRefreshThresholdBreached = false;
        onRefresh();
    };
    return (React.createElement("div", { className: "ptr " + className, style: { backgroundColor: backgroundColor }, ref: containerRef },
        React.createElement("div", { className: "ptr__pull-down", ref: pullDownRef },
            React.createElement("div", { className: "ptr__pull-down--loading" }, refreshingContent),
            React.createElement("div", { className: "ptr__pull-down--pull-more" }, pullingContent)),
        React.createElement("div", { className: "ptr__children", ref: childrenRef }, children)));
};

export default PullToRefresh;
