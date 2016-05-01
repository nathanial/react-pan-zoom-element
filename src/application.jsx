import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-es6-component';
import PanZoomElement from './PanZoomElement';

class Application extends Component {
  static propTypes = { }
  render(){
    return (
      <PanZoomElement width={1000} height={550}>
        <h1>Content</h1>
      </PanZoomElement>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application></Application>, document.getElementById("app"));
});
