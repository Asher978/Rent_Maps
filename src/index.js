import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import WebFont from 'webfontloader';

// loading 'ROBOTO'
WebFont.load({
  google: {
    families: ['Roboto:300,500,700']
  }
});

ReactDOM.render(<App />, document.getElementById('app'));