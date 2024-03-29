import {createRouterMiddleware} from '@lagunovsky/redux-react-router'
import {History} from 'history'
import {applyMiddleware, createStore, Store} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

// Import the state interface and our combined reducers/sagas.
import {ApplicationState, createRootReducer, rootSaga} from '.'

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({})
  // create the redux-saga middleware
  const sagaMiddleware = createSagaMiddleware()

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(createRouterMiddleware(history), sagaMiddleware))
  )

  // Don't forget to run the root saga, and return the store object.
  sagaMiddleware.run(rootSaga)
  return store
}
