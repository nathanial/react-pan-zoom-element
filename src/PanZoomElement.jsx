import React from 'react';
import Component from 'react-es6-component';

export default class PanZoomElement extends Component {

  constructor(){
    super(...arguments);
    this._lastX = 0;
    this._lastY = 0;

    this.state = {
      scale: 1,
      translate: {x: 0, y: 0}
    };
  }

  render(){
    const style = {
      transform: `translate(${this.state.translate.x}px, ${this.state.translate.y}px) scale(${this.state.scale})`
    };
    return (
      <div className="pan-zoom-element"
           onMouseDown={this._onMouseDown}
           onWheel={this._onWheel}>
        <div ref="content" className="content-container noselect"
             style={style}>
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
    this._lastX = this.state.translate.x;
    this._lastY = this.state.translate.y;
  }

  _onMouseMove(event){
    this.setState({
      translate: {
        x: (event.pageX - this._startX) + this._lastX,
        y: (event.pageY - this._startY) + this._lastY
      }
    });
  }

  _onWheel(event){
    if(event.deltaY < 0){
      this.setState({
        scale: this.state.scale * 1.1
      });
    } else {
      this.setState({
        scale: this.state.scale * 0.9
      });
    }
  }

}
