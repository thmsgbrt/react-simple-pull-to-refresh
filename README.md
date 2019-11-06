# react-simple-pull-to-refresh

[![npm version](https://badge.fury.io/js/react-simple-pull-to-refresh.svg)](https://badge.fury.io/js/react-simple-pull-to-refresh)
[![license](https://img.shields.io/github/license/thmsgbrt/react-simple-pull-to-refresh.svg)](https://github.com/thmsgbrt/react-simple-pull-to-refresh/blob/master/LICENSE)
A Simple Pull To Refresh Component for React Application with 0 dependency.

## Demo

TBD

## installation

`npm install react-simple-pull-to-refresh`

## Usage

#### import PullToRefresh

```tsx
import PullToRefresh from 'react-simple-pull-to-refresh';
```

#### Sample

```tsx
<PullToRefresh onRefresh={handleRefresh}>
  <ul>
    {list.map((item: string, index: number) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
</PullToRefresh>
```

## Props Matrix

|        Name         |         Type          | Required | Description                                                   |
| :-----------------: | :-------------------: | :------: | ------------------------------------------------------------- |
|  refreshingContent  | JSX.Element or string |  false   | Content displayed when refresh has been trigerred             |
|   pullingContent    | JSX.Element or string |  false   | Content displayed when pulling                                |
|  pullDownThreshold  |        number         |  false   | Distance to pull in pixel in order to trigger a refresh event |
| maxPullDownDistance |        number         |  false   | Maximum distance applied to Children when dragging            |
|      onRefresh      |       Function        |   true   | Function called when fefresh has been trigerred               |
|   backgroundColor   |        string         |  false   | Apply a backgroundColor                                       |
|     isPullable      |        boolean        |  false   | Enable or disable pulling behavior                            |
|      className      |        string         |  false   |                                                               |

## Contributing

`npm run dev`
