import React from 'react';
import './commands.css';

interface Props {
  canFetchMore: boolean;
  isPullable: boolean;
  fetchMoreThreshold: number;
  pullDownThreshold: number;
  maxPullDownDistance: number;
  setCanFetchMore: Function;
  setIsPullable: Function;
  setFetchMoreThreshold: Function;
  setPullDownThreshold: Function;
  setMaxPullDownDistance: Function;
  onReset: Function;
}

const Commands = ({
  canFetchMore,
  isPullable,
  setCanFetchMore,
  setIsPullable,
  setFetchMoreThreshold,
  fetchMoreThreshold,
  setPullDownThreshold,
  pullDownThreshold,
  setMaxPullDownDistance,
  maxPullDownDistance,
  onReset,
}: Props) => {
  return (
    <div className="commands">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="command__group">
          <button onClick={() => onReset()}>
            <code>Reset values</code>
          </button>
        </div>
        <div className="command__group">
          <input type="checkbox" id="ptr" checked={isPullable} onChange={() => setIsPullable()} />
          <label htmlFor="ptr">
            <code>isPullable</code>
          </label>
        </div>
        <div className="command__group">
          <input type="checkbox" id="fetchMore" checked={canFetchMore} onChange={() => setCanFetchMore()} />
          <label htmlFor="fetchMore">
            <code>canFetchMore</code>
          </label>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="command__group">
          <input
            type="number"
            id="fetchMoreTreshold"
            value={fetchMoreThreshold}
            onChange={e => setFetchMoreThreshold(e.target.value)}
          />
          <label htmlFor="fetchMoreTreshold">
            <code>fetchMoreTreshold</code>
          </label>
        </div>
        <div className="command__group">
          <input
            type="number"
            id="pullDownThreshold"
            value={pullDownThreshold}
            onChange={e => setPullDownThreshold(e.target.value)}
          />
          <label htmlFor="pullDownThreshold">
            <code>pullDownThreshold</code>
          </label>
        </div>
        <div className="command__group">
          <input
            type="number"
            id="maxPullDownDistance"
            value={maxPullDownDistance}
            onChange={e => setMaxPullDownDistance(e.target.value)}
          />
          <label htmlFor="maxPullDownDistance">
            <code>maxPullDownDistance</code>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Commands;
