import React from 'react';
import '../styles/refreshing-content.scss';

// Source: https://loading.io/css/

const RefreshingContent = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default RefreshingContent;
