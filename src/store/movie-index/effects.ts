import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { MovieIndexActionTypes } from './types'
import { fetchSearchRequestError, fetchSearchRequestSuccess } from './actions'
import { callApi, API_ENDPOINT, API_KEY } from '../../utils/api'

function getSearchUrl(searchTerm: string) {
  const seachConcatenated = searchTerm.split(' ').join('+')
  const seachQuery = `query=${seachConcatenated}` // encode?
  const searchUrl = `${API_ENDPOINT}/search/movie?${seachQuery}&api_key=${API_KEY}`
  return searchUrl
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleSearchChange(action: any) {
  try {
    if (!action.payload) {
      yield put(fetchSearchRequestSuccess([]))
      return
    }
    // To call async functions, use redux-saga's `call()`.
    const searchUrl = getSearchUrl(action.payload)
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
function* watchSearchChange() {
  yield takeEvery(MovieIndexActionTypes.SEARCH_CHANGED, handleSearchChange)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* movieIndexSaga() {
  yield all([fork(watchSearchChange)])
}

export default movieIndexSaga
