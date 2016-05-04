# React Pan Zoom Element
![NPM Version](https://img.shields.io/npm/v/react-pan-zoom-element.svg?style=flat-square)
![NPM Downloads](https://img.shields.io/npm/dm/react-pan-zoom-element.svg?style=flat-square)

## Installation
```sh
npm install react-pan-zoom-element --save
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PanZoomElement from 'react-pan-zoom-element';

const App = () => (
  <PanZoomElement width={100} height={100}>
    <h1>Zoomable thing</h1>
  </PanZoomElement>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
