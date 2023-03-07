import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/scss/style.scss';
import { MainApp } from './MainApp';
import rootReducer from './components/redux/reducers';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <MainApp />
  </Provider>
);