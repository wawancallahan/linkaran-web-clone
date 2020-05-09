import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toast } from 'react-toastify';
import store from './store/configureStore';
import history from './services/history';
import App from './App';
import * as Sentry from '@sentry/browser';

import "./assets/vendor/nucleo/css/nucleo.css"
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/scss/argon-dashboard-react.scss"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import 'react-toastify/dist/ReactToastify.min.css'
import "./assets/css/app.css";

Sentry.init({
  dsn: "https://00802d88d1534f2d97d04ddac39386a8@o207647.ingest.sentry.io/5217308"
});

toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);