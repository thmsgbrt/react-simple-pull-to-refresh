# react-simple-pull-to-refresh

[![npm version](https://badge.fury.io/js/react-simple-pull-to-refresh.svg)](https://badge.fury.io/js/react-simple-pull-to-refresh)
[![license](https://img.shields.io/github/license/thmsgbrt/react-simple-pull-to-refresh.svg)](https://github.com/thmsgbrt/react-simple-pull-to-refresh/blob/master/LICENSE)
![](https://badgen.net/npm/types/react-simple-pull-to-refresh)
![](https://badgen.net/badge/maintained/yes/green)

A Simple Pull To Refresh Component for React Application with 0 dependency.

## Demo

[Click here 👍](https://thmsgbrt.github.io/react-simple-pull-to-refresh)

## Installation

`npm i react-simple-pull-to-refresh`

## Usage

```jsx
import PullToRefresh from 'react-simple-pull-to-refresh';

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

## Props Matrix

|        Name         |         Type          | Required | Description                                                   |
| :-----------------: | :-------------------: | :------: | ------------------------------------------------------------- |
|      onRefresh      |       Function        |   true   | Function called when fefresh has been trigerred               |
|     isPullable      |        boolean        |  false   | Enable or disable pulling behavior                            |
|  refreshingContent  | JSX.Element or string |  false   | Content displayed when refresh has been trigerred             |
|   pullingContent    | JSX.Element or string |  false   | Content displayed when pulling                                |
|  pullDownThreshold  |        number         |  false   | Distance to pull in pixel in order to trigger a refresh event |
| maxPullDownDistance |        number         |  false   | Maximum distance applied to Children when dragging            |
|   backgroundColor   |        string         |  false   | Apply a backgroundColor                                       |
|      className      |        string         |  false   |                                                               |

## Contributing

`npm run dev`
