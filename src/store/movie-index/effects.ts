/* eslint-disable @typescript-eslint/camelcase */
import {
  all, call, fork, put, takeLatest, select
} from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import { PageApiResponse } from './types'
import { fetchSearchAction, searchChange, pageChange } from './actions'
import { callApi, API_ENDPOINT, API_KEY } from '../../utils/api'

function getSearchUrl(searchTerm: string, page: number) {
  const seachConcatenated = searchTerm.split(' ').join('+')
  const seachQuery = `query=${seachConcatenated}` // encode?
  const searchUrl = `${API_ENDPOINT}/search/movie?${seachQuery}&page=${page}&api_key=${API_KEY}`
  return searchUrl
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleSearchChange(action: any) {
  try {
    if (!action.payload) {
      yield put(
        fetchSearchAction.success({
          page: 1,
          total_pages: 0,
          total_results: 0,
          results: []
        })
      )
      return
    }
    const searchUrl = getSearchUrl(action.payload, 1)
    // To call async functions, use redux-saga's `call()`.
    const res: PageApiResponse = yield call(callApi, 'get', searchUrl)
    if (res.error) {
      yield put(fetchSearchAction.failure(res.error))
    } else {
      yield put(fetchSearchAction.success(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchSearchAction.failure(err.stack))
    } else {
      yield put(fetchSearchAction.failure('An unknown error occured.'))
    }
  }
}

// This is our watcher function. We use `take*()` functions to watch Redux for a specific action
// type, and run our saga, for example the `handleFetch()` saga above.
function* watchSearchChange() {
  yield takeLatest(getType(searchChange), handleSearchChange)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handlePageChange(action: any) {
  try {
    const search = yield select(state => state.movieIndex.search)
    const searchUrl = getSearchUrl(search, action.payload)
    // To call async functions, use redux-saga's `call()`.
    const res: PageApiResponse = yield call(callApi, 'get', searchUrl)
    if (res.error) {
      yield put(fetchSearchAction.failure(res.error))
    } else {
      yield put(fetchSearchAction.success(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchSearchAction.failure(err.stack))
    } else {
      yield put(fetchSearchAction.failure('An unknown error occured.'))
    }
  }
}

function* watchPageChange() {
  yield takeLatest(getType(pageChange), handlePageChange)
}

// We can also use `fork()` here to split our saga into multiple watchers.
export default function* movieIndexSaga() {
  yield all([fork(watchSearchChange), fork(watchPageChange)])
}
