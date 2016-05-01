import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-es6-component';
import PanZoomElement from './PanZoomElement';

class Application extends Component {
  static propTypes = { }
  render(){
    return (
      <PanZoomElement width={1000} height={1000}>
        <span style={{position:'absolute', left:0, top:0}}>Top Left</span>
        <span style={{position:'absolute', right:0, top:0}}>Top Right</span>
        <span style={{position:'absolute', left:0, bottom:0}}>Bottom Left</span>
        <span style={{position:'absolute', right:0, bottom:0}}>Bottom Right</span>
      </PanZoomElement>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application></Application>, document.getElementById("app"));
});
