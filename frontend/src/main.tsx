import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import App from "./App"
import reducer from "./redux/store/dayReducer"

const store = configureStore({reducer: reducer, middleware: [thunk]})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
)