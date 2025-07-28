import React from 'react';
import ReactDOM from 'react-dom/client';
import './firebase/config.js';
import './App.css';

import { AuthProvider } from './context/AuthContext.jsx';
import App from './App.jsx';
import {Provider} from "react-redux";
import store from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AuthProvider>
    </React.StrictMode>
);
