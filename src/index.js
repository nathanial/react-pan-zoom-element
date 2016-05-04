// @if NODE_ENV='production'
import PanZoomElement from './PanZoomElement';

module.exports = PanZoomElement;
// @endif


// @if NODE_ENV='development'

import app from 'app';
import BrowserWindow from 'browser-window';


app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    'min-width': 500,
    'min-height': 300,
    'auto-hide-menu-bar' : true
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

// @endif
