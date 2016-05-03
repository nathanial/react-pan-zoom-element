import React from 'react';
import Component from 'react-es6-component';
import Panner from 'centered-pan-zoom';

export default class PanZoomElement extends Component {

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }

  constructor(){
    super(...arguments);
    this._lastX = 0;
    this._lastY = 0;
    this._panner = new Panner({
      screenWidth: this.props.width,
      screenHeight: this.props.height
    });
    this.state = {
      scale: this._panner.scale,
      translate: {
        x: this._panner.viewport.x,
        y: this._panner.viewport.y
      }
    };
  }

  render(){
    const style = {
      transform: `translate(${this.state.translate.x}px, ${this.state.translate.y}px) scale(${this.state.scale})`,
      transformOrigin: 'top left'
    };
    return (
      <div className="pan-zoom-element"
           ref="element"
           style={{width: this.props.width, height: this.props.height}}
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
  }

  _onMouseMove(event){
    this._panner.panFrom(
      {
        x: this._startX,
        y: this._startY
      },
      {
        x: event.pageX,
        y: event.pageY
      });
    this._startX = event.pageX;
    this._startY = event.pageY;
    this.setState({
      translate: {
        x: this._panner.viewport.x,
        y: this._panner.viewport.y
      },
      scale: this._panner.scale
    });
  }

  _onWheel(event){
    let zoomFactor;
    if(event.deltaY < 0){
      zoomFactor = this.state.scale * 1.05;
    } else {
      zoomFactor = this.state.scale * 0.95;
    }
    this._panner.zoom(zoomFactor, {x: event.pageX, y: event.pageY});
    this.setState({
      translate: {
        x: this._panner.viewport.x + 0 * (this.props.width * this._panner.scale) / 2,
        y: this._panner.viewport.y + 0 * (this.props.height * this._panner.scale) / 2
      },
      scale: this._panner.scale
    });
  }
}
