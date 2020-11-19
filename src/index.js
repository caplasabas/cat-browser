import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import store from './store'

const Main = () => {
  return (
    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <App/>
        </Provider>
      </React.StrictMode>,
    </div>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);

reportWebVitals();