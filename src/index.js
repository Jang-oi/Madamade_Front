import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './contexts/loadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LoadingProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </LoadingProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
