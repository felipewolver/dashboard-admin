import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { configureStore } from '@reduxjs/toolkit'
/* globalReducer variável nomeada q vem de state q tem a funçao createSlice({}) 
   para configurar globalmente na funçao configureStore() */
import globalReducer from "./state"; 
import { Provider } from 'react-redux'


// Aqui vai englobar em toda aplicação. o <Provider tem a prop. store q vai 
// receber como varável a const store q tem a configureStore() para executar globalmente.
const store = configureStore({
  reducer: {
    global: globalReducer
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  
  </React.StrictMode>,
)
