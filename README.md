# react-simple-pull-to-refresh

[![npm version](https://badge.fury.io/js/react-simple-pull-to-refresh.svg)](https://badge.fury.io/js/react-simple-pull-to-refresh)
[![license](https://img.shields.io/github/license/thmsgbrt/react-simple-pull-to-refresh.svg)](https://github.com/thmsgbrt/react-simple-pull-to-refresh/blob/master/LICENSE)
![](https://badgen.net/npm/types/react-simple-pull-to-refresh)
![](https://badgen.net/badge/maintained/yes/green)

A Simple Pull-To-Refresh Component for React Application with 0 dependency.
Works for Mobile and Desktop.

## Contributing

⚠️ I don't have much time to take care of the issues at the moment.

🙏 Any help and contribution is greatly appreciated.

## Demo

[Click here 👍](https://thmsgbrt.github.io/react-simple-pull-to-refresh)

## Installation

`npm i react-simple-pull-to-refresh`

## Usage

```jsx
import PullToRefresh from 'react-simple-pull-to-refresh';
```

Pull To Refresh only

```jsx
// ...

return (
  <PullToRefresh onRefresh={handleRefresh}>
    <ul>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </PullToRefresh>
);

// ...
```

Pull To Refresh and Fetch More enabled

```jsx
// ...

return (
  <PullToRefresh onRefresh={handleRefresh} canFetchMore={true} onFetchMore={handleFetchMore}>
    <ul>
      {list.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </PullToRefresh>
);

// ...
```

## Props Matrix

|        Name         |         Type          | Required |        Default        | Description                                                                  |
| :-----------------: | :-------------------: | :------: | :-------------------: | ---------------------------------------------------------------------------- |
|     isPullable      |        boolean        |  false   |         true          | Enable or disable pulling feature                                            |
|      onRefresh      |  () => Promise<any>   |   true   |                       | Function called when Refresh Event has been trigerred                        |
|  pullDownThreshold  |        number         |  false   |          67           | Distance in pixel to pull to trigger a Refresh Event                         |
| maxPullDownDistance |        number         |  false   |          95           | Maximum transitionY applied to Children when dragging                        |
|     resistance      |        number         |  false   |           1           | Scale of difficulty to pull down                                             |
|  refreshingContent  | JSX.Element or string |  false   | <RefreshingContent /> | Content displayed when Pulling or Fetch more has been trigerred              |
|   pullingContent    | JSX.Element or string |  false   |  <PullingContent />   | Content displayed when Pulling                                               |
|    canFetchMore     |        boolean        |  false   |         false         | Enable or disable fetching more feature                                      |
|     onFetchMore     |  () => Promise<any>   |  false   |                       | Function called when Fetch more Event has been trigerred                     |
| fetchMoreThreshold  |        number         |  false   |          100          | Distance in pixel from bottom of the container to trigger a Fetch more Event |
|   backgroundColor   |        string         |  false   |                       | Apply a backgroundColor                                                      |
|      className      |        string         |  false   |                       |                                                                              |

## Changelog

1.3.3: Update package.json peerDependencies to support react 18 - (From: [@mjauernig](https://github.com/mjauernig))

1.3.2: Fix build issue encountered with 1.3.1

1.3.1: Fix issue preventing fixed elements to work properly - (From: [@ManuDoni](https://github.com/ManuDoni))

1.3.0: Add a _resistance_ prop, that allows to adjust the pull down difficulty - (From: [@joshuahiggins](https://github.com/joshuahiggins))

1.2.5: Fix event listenter leaks - (From: [@d-s-x](https://github.com/d-s-x))

1.2.4: Fix overscroll on iOS Safari - (From: [@d-s-x](https://github.com/d-s-x))

1.2.3: Add React 17+ as valid peer dependencies - (From: [@Felixmosh](https://github.com/felixmosh))

1.2.2: Remove non-null assertion operators from ref.current + TouchEvent check for Mozilla - (From: [@HamAndRock](https://github.com/HamAndRock))

1.2.1: Remove unnecessary z-index

1.2.0: onRefresh and onFetchMore now require to be of type () => Promise<any>

1.1.2: Bind Scroll event to Window

1.1.0: Check for "canFetchMore" value for each scroll events.

1.1.0: Add a Fetch More feature
