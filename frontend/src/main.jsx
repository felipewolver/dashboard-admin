window.process = {}; // "react": "^18.2.0", "react-scripts": "5.0.1",

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
/* globalReducer variável nomeada q vem de state q tem a funçao createSlice({}) 
   para configurar globalmente na funçao configureStore() */
import globalReducer from "./state"; // vem de /state/index.js
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from "./state/api.js";


// Aqui vai englobar em toda aplicação. o <Provider tem a prop. store q vai 
// receber como varável a const store q tem a configureStore() para executar globalmente.
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)

});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  
  </React.StrictMode>,
)
