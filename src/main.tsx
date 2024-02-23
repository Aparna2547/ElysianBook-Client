import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import store from './Store/Store.ts'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store} >
  <React.StrictMode>
    <GoogleOAuthProvider clientId='821332113342-cl7qa05gmri1dktj4osg3ihe014l1ook.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  </Provider>
)
