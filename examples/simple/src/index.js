import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from 'xtate';

ReactDOM.render(
    <StoreProvider store={{ articles: [] }}>
        <App />
    </StoreProvider>
    , document.getElementById('root'));