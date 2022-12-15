import {ThemeProvider} from '@emotion/react'
import {ReduxRouter, ReduxRouterSelector} from '@lagunovsky/redux-react-router'
import {createBrowserHistory} from 'history'
import {Provider} from 'react-redux'
import lightTheme from './theme/themes/light'
import AppRoutes from './routes'
import {ApplicationState} from './store'
import configureStore from './store/configureStore'

const history = createBrowserHistory()
const store = configureStore(history, window.INITIAL_REDUX_STATE)
const routerSelector: ReduxRouterSelector<ApplicationState> = state => state.router

const App = () => (
  <ThemeProvider theme={lightTheme}>
    <Provider store={store}>
      <ReduxRouter history={history} routerSelector={routerSelector}>
        <AppRoutes />
      </ReduxRouter>
    </Provider>
  </ThemeProvider>
)

export default App
