import React from 'react';
import Component from 'react-es6-component';

export default class PanZoomElement extends Component {

  constructor(){
    super(...arguments);
    this._lastX = 0;
    this._lastY = 0;
  }

  render(){
    return (
      <div className="pan-zoom-element"
           onMouseDown={this._onMouseDown}>
        <div ref="content" className="content-container noselect">
          {this.props.children}
        </div>
      </div>
    );
  }

  _onMouseDown(event){
    this._startX = event.pageX;
    this._startY = event.pageY;
    document.addEventListener('mouseup', this._onMouseUp, true);
    document.addEventListener('mousemove', this._onMouseMove, true);
  }

  _onMouseUp(){
    document.removeEventListener('mouseup', this._onMouseUp, true);
    document.removeEventListener('mousemove', this._onMouseMove, true);
    this._lastX = this._currentX;
    this._lastY = this._currentY;
  }

  _onMouseMove(event){
    this._currentX = (event.pageX - this._startX) + this._lastX;
    this._currentY = (event.pageY - this._startY) + this._lastY;
    this.refs.content.style.transform = `translate(${this._currentX}px, ${this._currentY}px)`;
  }

}
