import {createRouterReducer, ReduxRouterState} from '@lagunovsky/redux-react-router'
import {History} from 'history'
import {combineReducers} from 'redux'
import {all, fork} from 'redux-saga/effects'

import movieIndexSaga from './movie-index/effects'
import {movieIndexReducer} from './movie-index/reducer'
import {MovieIndexState} from './movie-index/types'

import movieInfoSaga from './movie-info/effects'
import {movieInfoReducer} from './movie-info/reducers'
import {MovieInfoState} from './movie-info/types'

// The top-level state object
export interface ApplicationState {
  router: ReduxRouterState
  movieIndex: MovieIndexState
  movieInfo: MovieInfoState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = (history: History) =>
  combineReducers({
    router: createRouterReducer(history),
    movieIndex: movieIndexReducer,
    movieInfo: movieInfoReducer,
  })

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(movieIndexSaga), fork(movieInfoSaga)])
}
