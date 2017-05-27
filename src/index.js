import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {reducer} from './snakeGame'

window.addEventListener('keydown', (e) => {
  switch(e.keyCode) {
    case 37: return store.dispatch({type:'L'})
    case 38: return store.dispatch({type:'F'})
    case 39: return store.dispatch({type:'R'})
    default: return console.log('use arrow keys < ^ >')
  }
});



let store = createStore(reducer)

store.subscribe(() =>
  console.log(store.getState())
)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
