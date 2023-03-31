import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css'
import QueryBoat from './QueryBoat';
import { Provider } from 'react-redux';
import store from './redux'
import './css/style.css'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <div className="home">
            <QueryBoat />
        </div>
    </Provider>
);