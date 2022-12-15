import {createBrowserHistory} from 'history'
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'typeface-ibm-plex-sans'
import App from './entry'
import configureStore from './store/configureStore'

const history = createBrowserHistory()

const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(history, initialState)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App store={store} history={history} />
  </React.StrictMode>
)
