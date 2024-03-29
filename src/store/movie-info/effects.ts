import {all, call, fork, put, takeEvery} from 'redux-saga/effects'
import {getType} from 'typesafe-actions'
import {API_ENDPOINT, API_KEY, callApi} from '../../common/utils/api'
import {fetchInfoRequest, fetchInfoRequestError, fetchInfoRequestSuccess} from './actions'
import {MovieInfo} from './types'

function* handleFetch(action: any) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const url = `${API_ENDPOINT}/movie/${action.payload}?api_key=${API_KEY}`
    const res: MovieInfo | {error: string} = yield call(callApi, 'get', url)

    if (res.error) {
      yield put(fetchInfoRequestError(res.error))
    } else {
      yield put(fetchInfoRequestSuccess(res as MovieInfo))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchInfoRequestError(err.stack))
    } else {
      yield put(fetchInfoRequestError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(getType(fetchInfoRequest), handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* movieInfoSaga() {
  yield all([fork(watchFetchRequest)])
}

export default movieInfoSaga
