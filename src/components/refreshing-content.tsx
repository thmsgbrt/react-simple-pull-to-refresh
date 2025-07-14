import React from 'react';
import '../styles/refreshing-content.css';

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
