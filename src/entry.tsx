import React from 'react'
import { History } from 'history'
import { ThemeProvider } from 'emotion-theming'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import AppRoutes from './routes'
import lightTheme from './assets/styles/themes/light'
import { ApplicationState } from './store'

interface AppProps {
  store: Store<ApplicationState>
  history: History
}

const App = ({ store, history }: AppProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={lightTheme}>
        <AppRoutes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

export default App
