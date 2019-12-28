# react-simple-pull-to-refresh

[![npm version](https://badge.fury.io/js/react-simple-pull-to-refresh.svg)](https://badge.fury.io/js/react-simple-pull-to-refresh)
[![license](https://img.shields.io/github/license/thmsgbrt/react-simple-pull-to-refresh.svg)](https://github.com/thmsgbrt/react-simple-pull-to-refresh/blob/master/LICENSE)
![](https://badgen.net/npm/types/react-simple-pull-to-refresh)
![](https://badgen.net/badge/maintained/yes/green)

A Simple Pull-To-Refresh Component for React Application with 0 dependency.
Works for Mobile and Desktop.

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
|      onRefresh      |       Function        |   true   |                       | Function called when Refresh Event has been trigerred                        |
|  pullDownThreshold  |        number         |  false   |          67           | Distance in pixel to pull to trigger a Refresh Event                         |
| maxPullDownDistance |        number         |  false   |          95           | Maximum transitionY applied to Children when dragging                        |
|  refreshingContent  | JSX.Element or string |  false   | <RefreshingContent /> | Content displayed when Pulling or Fetch more has been trigerred              |
|   pullingContent    | JSX.Element or string |  false   |  <PullingContent />   | Content displayed when Pulling                                               |
|    canFetchMore     |        boolean        |  false   |         false         | Enable or disable fetching more feature                                      |
|     onFetchMore     |       Function        |  false   |                       | Function called when Fetch more Event has been trigerred                     |
| fetchMoreThreshold  |        number         |  false   |          100          | Distance in pixel from bottom of the container to trigger a Fetch more Event |
|   backgroundColor   |        string         |  false   |                       | Apply a backgroundColor                                                      |
|      className      |        string         |  false   |                       |                                                                              |

## Contributing

`npm run dev`

## Changelog

1.1.0: Check for "canFetchMore" value for each scroll events.
1.1.0: Add a Fetch More feature
