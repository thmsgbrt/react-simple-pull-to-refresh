import React, { useRef, useEffect } from 'react';
import { isTreeScrollable } from '../isScrollable';
import RefreshingContent from './refreshing-content';
import PullingContent from './pulling-content';
import { DIRECTION } from '../types';
import '../styles/main.scss';

interface PullToRefreshProps {
  refreshingContent?: JSX.Element | string;
  pullingContent?: JSX.Element | string;
  pullDownThreshold?: number;
  maxPullDownDistance?: number;
  onRefresh: Function;
  backgroundColor?: string;
  isPullable?: boolean;
  children: JSX.Element;
  className?: string;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  refreshingContent = <RefreshingContent />,
  pullingContent = <PullingContent />,
  pullDownThreshold = 67,
  maxPullDownDistance = 95, // max distance to scroll to trigger refresh
  onRefresh,
  backgroundColor,
  isPullable = true,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const pullDownRef = useRef<HTMLDivElement>(null);
  let pullToRefreshThresholdBreached: boolean = false;
  let isDragging: boolean = false;
  let startY: number = 0;
  let currentY: number = 0;

  useEffect(() => {
    if (!isPullable || !childrenRef || !childrenRef.current) return;
    childrenRef.current.addEventListener('touchstart', onTouchStart, { passive: true });
    childrenRef.current.addEventListener('mousedown', onTouchStart);
    childrenRef.current.addEventListener('touchmove', onTouchMove, { passive: false });
    childrenRef.current.addEventListener('mousemove', onTouchMove);
    childrenRef.current.addEventListener('touchend', onEnd);
    childrenRef.current.addEventListener('mouseup', onEnd);
    document.body.addEventListener('mouseleave', onEnd);

    return () => {
      if (!isPullable || !childrenRef || !childrenRef.current) return;
      childrenRef.current.removeEventListener('touchstart', onTouchStart);
      childrenRef.current.removeEventListener('mousedown', onTouchStart);
      childrenRef.current.removeEventListener('touchmove', onTouchMove);
      childrenRef.current.removeEventListener('mousemove', onTouchMove);
      childrenRef.current.removeEventListener('touchend', onEnd);
      childrenRef.current.removeEventListener('mouseup', onEnd);
      document.body.removeEventListener('mouseleave', onEnd);
    };
  }, [isPullable]);

  useEffect(() => {
    initContainer();
  }, [children]);

  const initContainer = (): void => {
    requestAnimationFrame(() => {
      if (childrenRef.current) {
        childrenRef.current.style.overflowX = 'hidden';
        childrenRef.current.style.overflowY = 'auto';
        // childrenRef.current.style.overflow = 'auto';
        childrenRef.current.style.transform = `translate(0px, 0px)`;
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

  const onTouchStart = (e: MouseEvent | TouchEvent): void => {
    isDragging = false;
    if (e instanceof MouseEvent) {
      startY = e.pageY;
    }
    if (e instanceof TouchEvent) {
      startY = e.touches[0].pageY;
    }
    currentY = startY;
    // Check if element can be scrolled
    if (e.type === 'touchstart' && isTreeScrollable(e.target as HTMLElement, DIRECTION.UP)) {
      return;
    }
    // Top non visible so cancel
    if (childrenRef.current!.getBoundingClientRect().top < 0) {
      return;
    }
    isDragging = true;
  };

  const onTouchMove = (e: MouseEvent | TouchEvent): void => {
    if (!isDragging) {
      return;
    }

    if (e instanceof TouchEvent) {
      currentY = e.touches[0].pageY;
    } else {
      currentY = e.pageY;
    }

    containerRef.current!.classList.add('ptr--dragging');

    if (currentY < startY) {
      isDragging = false;
      return;
    }

    // Limit to trigger refresh has been breached
    if (currentY - startY >= pullDownThreshold) {
      isDragging = true;
      pullToRefreshThresholdBreached = true;
      containerRef.current!.classList.remove('ptr--dragging');
      containerRef.current!.classList.add('ptr--treshold-breached');
    } else {
      pullToRefreshThresholdBreached = false;
      containerRef.current!.classList.remove('ptr--treshold-breached');
    }

    // maxPullDownDistance breached, stop the animation
    if (currentY - startY > maxPullDownDistance) {
      return;
    }
    pullDownRef.current!.style.opacity = ((currentY - startY) / 65).toString();
    childrenRef.current!.style.overflow = 'visible';
    childrenRef.current!.style.transform = `translate(0px, ${currentY - startY}px)`;
    pullDownRef.current!.style.visibility = 'visible';
  };

  const onEnd = (): void => {
    isDragging = false;
    startY = 0;
    currentY = 0;

    // Container has not been dragged enough, put it back to it's initial state
    if (!pullToRefreshThresholdBreached) {
      pullDownRef.current!.style.visibility = 'hidden';
      initContainer();
      return;
    }

    childrenRef.current!.style.overflow = 'visible';
    childrenRef.current!.style.transform = `translate(0px, ${pullDownThreshold}px)`;
    pullToRefreshThresholdBreached = false;
    onRefresh();
  };

  return (
    <div className={`ptr ${className}`} style={{ backgroundColor }} ref={containerRef}>
      <div className="ptr__pull-down" ref={pullDownRef}>
        <div className="ptr__pull-down--loading">{refreshingContent}</div>
        <div className="ptr__pull-down--pull-more">{pullingContent}</div>
      </div>
      <div className="ptr__children" ref={childrenRef}>
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
