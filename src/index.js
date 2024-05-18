import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
 import { defineCustomElements } from '@ionic/pwa-elements/loader'
 import i18n from './i18n';
//  import { FontSizeProvider } from './FontSizeContext';

const startApp=()=>{

// Import i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App/>
    </I18nextProvider>
  </React.StrictMode>
);
reportWebVitals();
}
if(window.cordova){
  document.addEventListener('deviceready',startApp,false)
}
else{
  startApp()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 defineCustomElements(window)
