import React          from 'react';
import ReactDOM       from 'react-dom';
import { Provider }   from 'react-redux';
import configureStore from 'core/store/configureStore';
import App            from 'containers/App';
import { Web3Provider } from 'react-web3';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Web3Provider>
      <App/>
    </Web3Provider>
  </Provider>,
  document.getElementById('root')
);