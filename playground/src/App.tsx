import React, { useState } from 'react';
import './App.css';
import PullToRefresh from './pull-to-refresh';

const App: React.FC = () => {
  // prettier-ignore
  const FAKE_LIST = ['foo','bar','baz','foo','foo','bar','baz','foo','foo','bar','baz','foo','foo','bar','baz','foo'];
  const [list, setList] = useState<string[]>(FAKE_LIST);

  const getNewData = (): void => {
    setTimeout(() => {
      setList([...list, ...FAKE_LIST]);
    }, 1500);
  };

  return (
    <div className="App">
      <PullToRefresh onRefresh={getNewData} canFetchMore={true} onFetchMore={getNewData}>
        <>
          <header className="App-header">Pull To Refresh</header>
          <div className="App-container">
            <ul>
              {list.map((item: string, index: number) => (
                <li key={index}>
                  {index} - {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      </PullToRefresh>
    </div>
  );
};

export default App;
