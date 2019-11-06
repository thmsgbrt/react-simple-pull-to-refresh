import React from 'react';
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
declare const PullToRefresh: React.FC<PullToRefreshProps>;
export default PullToRefresh;
