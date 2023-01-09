import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

let rootElement = document.getElementById('root');

if (!rootElement) {
    rootElement = document.createElement('div');
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const root = createRoot(rootElement);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
