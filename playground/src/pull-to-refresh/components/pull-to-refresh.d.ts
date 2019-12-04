import React from 'react';
import '../styles/main.scss';
interface PullToRefreshProps {
    isPullable?: boolean;
    canFetchMore?: boolean;
    onRefresh: Function;
    onFetchMore?: Function;
    refreshingContent?: JSX.Element | string;
    pullingContent?: JSX.Element | string;
    children: JSX.Element;
    pullDownThreshold?: number;
    fetchMoreThreshold?: number;
    maxPullDownDistance?: number;
    backgroundColor?: string;
    className?: string;
}
declare const PullToRefresh: React.FC<PullToRefreshProps>;
export default PullToRefresh;
