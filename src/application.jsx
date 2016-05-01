import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'react-es6-component';
import ExampleComponent from './ExampleComponent';

class Application extends Component {
  static propTypes = { }
  render(){
    return (
      <ExampleComponent />
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application></Application>, document.getElementById("app"));
});
