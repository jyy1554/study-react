import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

const listener = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  );
};

store.subscribe(listener);
listener(); //초기 렌더링을 위해 수동으로 render 함수를 실행시켜줌
