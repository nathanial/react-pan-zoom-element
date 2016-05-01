import React from 'react';
import Component from 'react-es6-component';

export default class PanZoomElement extends Component {

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }

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
    let zoomFactor;
    if(event.deltaY < 0){
      zoomFactor = 1.1;
    } else {
      zoomFactor = 0.9;
    }

    const newZoom = zoomFactor * this.state.scale;

    const realX = event.pageX - this.refs.element.offsetLeft;
    const realY = event.pageY - this.refs.element.offsetTop;
    const x = (realX - this.props.width / 2) / this.props.width;
    const y = (realY - this.props.height / 2) / this.props.height;

    const deltaX = x * (this.props.width / newZoom);
    const deltaY = y * (this.props.height / newZoom);
    console.log("Mouse", x, y);
    console.log("Delta", deltaX, deltaY);
    console.log("");

    this.setState({
      translate: {
        x: this.state.translate.x + deltaX,
        y: this.state.translate.y + deltaY
      },
      scale: this.state.scale * zoomFactor
    });
  }
}
