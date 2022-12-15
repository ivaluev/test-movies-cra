import {ThemeProvider} from '@emotion/react'
import {ConnectedRouter} from 'connected-react-router'
import {History} from 'history'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import lightTheme from './assets/styles/themes/light'
import AppRoutes from './routes'
import {ApplicationState} from './store'

interface AppProps {
  store: Store<ApplicationState>
  history: History
}

const App = ({store, history}: AppProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={lightTheme}>
        <AppRoutes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

export default App
