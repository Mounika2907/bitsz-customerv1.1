import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AllReducers from './Store/Reducers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { createBrowserHistory } from 'history';

// export const history = createBrowserHistory({
//     basename: process.env.PUBLIC_URL
// });

toast.configure({
  autoClose: 4000,
  draggable: false,
  position: toast.POSITION.TOP_RIGHT,
  hideProgressBar: true,
  pauseOnFocusLoss: false,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
