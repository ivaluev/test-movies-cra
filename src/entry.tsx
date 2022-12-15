import {ThemeProvider} from '@emotion/react'
import {ReduxRouter} from '@lagunovsky/redux-react-router'
import {History} from 'history'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Store} from 'redux'
import lightTheme from './assets/styles/themes/light'
import AppRoutes from './routes'
import ErrorPage from './routes/404'
import {ApplicationState} from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoutes />,
    errorElement: <ErrorPage />,
  },
])

interface AppProps {
  store: Store<ApplicationState>
  history: History
}

const App = ({store, history}: AppProps) => (
  <Provider store={store}>
    <ReduxRouter history={history}>
      <ThemeProvider theme={lightTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxRouter>
  </Provider>
)

export default App
