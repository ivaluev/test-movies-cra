import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { MovieIndexActionTypes } from './types'
import { fetchSearchRequestError, fetchSearchRequestSuccess } from './actions'
import { callApi, API_ENDPOINT, API_KEY } from '../../utils/api'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleFetch(action: any) {
  try {
    const seachConcatenated = action.payload.split(' ').join('+')
    const seachQuery = `query=${seachConcatenated}` // encode?
    const searchUrl = `${API_ENDPOINT}/search/movie?${seachQuery}&api_key=${API_KEY}`
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', searchUrl)

    if (res.error) {
      yield put(fetchSearchRequestError(res.error))
    } else {
      yield put(fetchSearchRequestSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchSearchRequestError(err.stack))
    } else {
      yield put(fetchSearchRequestError('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(MovieIndexActionTypes.FETCH_REQUEST, handleFetch)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* movieIndexSaga() {
  yield all([fork(watchFetchRequest)])
}

export default movieIndexSaga
