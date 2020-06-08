import React, { useState } from 'react';
import './App.css';
import PullToRefresh from './pull-to-refresh';
import Commands from './commands/commands';

const DEFAULT_VALUES = {
  isPullable: true,
  canFetchMore: false,
  fetchMoreThreshold: 100,
  pullDownThreshold: 67,
  maxPullDownDistance: 95,
};

const App: React.FC = () => {
  // prettier-ignore
  const FAKE_LIST = ['foo','bar','baz','foo','foo','bar','baz','foo','foo','bar','baz','foo','foo','bar','baz'];
  const [list, setList] = useState<string[]>(FAKE_LIST);
  const [isPullable, setIsPullable] = useState<boolean>(DEFAULT_VALUES.isPullable);
  const [canFetchMore, setCanFetchMore] = useState<boolean>(DEFAULT_VALUES.canFetchMore);
  const [fetchMoreThreshold, setFetchMoreThreshold] = useState<number>(DEFAULT_VALUES.fetchMoreThreshold);
  const [pullDownThreshold, setPullDownThreshold] = useState<number>(DEFAULT_VALUES.pullDownThreshold);
  const [maxPullDownDistance, setMaxPullDownDistance] = useState<number>(DEFAULT_VALUES.maxPullDownDistance);

  const handleReset = (): void => {
    setIsPullable(DEFAULT_VALUES.isPullable);
    setCanFetchMore(DEFAULT_VALUES.canFetchMore);
    setFetchMoreThreshold(DEFAULT_VALUES.fetchMoreThreshold);
    setPullDownThreshold(DEFAULT_VALUES.pullDownThreshold);
    setMaxPullDownDistance(DEFAULT_VALUES.maxPullDownDistance);
  };

  const getNewData = (): Promise<void> => {
    return new Promise(res => {
      setTimeout(() => {
        res(setList([...list, ...FAKE_LIST]));
      }, 1500);
    });
  };

  return (
    <div className="App">
      <div className="App-commands">
        <Commands
          canFetchMore={canFetchMore}
          setCanFetchMore={() => setCanFetchMore(!canFetchMore)}
          isPullable={isPullable}
          setIsPullable={() => setIsPullable(!isPullable)}
          fetchMoreThreshold={fetchMoreThreshold}
          setFetchMoreThreshold={(n: number) => setFetchMoreThreshold(n)}
          pullDownThreshold={pullDownThreshold}
          setPullDownThreshold={(n: number) => setPullDownThreshold(n)}
          maxPullDownDistance={maxPullDownDistance}
          setMaxPullDownDistance={(n: number) => setMaxPullDownDistance(n)}
          onReset={handleReset}
        />
      </div>
      <div className="App-ptr">
        <PullToRefresh
          onRefresh={getNewData}
          canFetchMore={canFetchMore}
          isPullable={isPullable}
          onFetchMore={getNewData}
          fetchMoreThreshold={fetchMoreThreshold}
          pullDownThreshold={pullDownThreshold}
          maxPullDownDistance={maxPullDownDistance}
        >
          <>
            <header className="App-header">
              <h1>Demo App</h1>
              <h2>Pull To Refresh</h2>
            </header>
            <div className="App-container">
              <ul>
                {list.map((item: string, index: number) => (
                  <li key={index}>
                    {index + 1} - {item}
                  </li>
                ))}
              </ul>
            </div>
          </>
        </PullToRefresh>
      </div>
    </div>
  );
};

export default App;
