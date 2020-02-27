/* eslint-disable no-param-reassign */
import { Reducer } from 'redux'
import produce from 'immer'
import { MovieIndexState, MovieIndexActionTypes, PageApiResponse } from './types'

// Type-safe initialState!
export const initialState: MovieIndexState = {
  loading: false
}

// I used Immer to prevent mutability without being forced to copy state object every time.
// Immer perfectly reduces amount if code in reducers, it's safe and makes code much more readable.
const reducer: Reducer<MovieIndexState> = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MovieIndexActionTypes.SEARCH_CHANGED:
        draft.search = action.payload
        draft.page = 1
        draft.loading = !!action.payload
        break
      case MovieIndexActionTypes.PAGE_CHANGED:
        draft.page = action.payload
        draft.loading = true
        break
      case MovieIndexActionTypes.FETCH_REQUEST:
        draft.loading = true
        break
      case MovieIndexActionTypes.FETCH_SUCCESS:
        {
          draft.loading = false
          const data: PageApiResponse = action.payload
          // draft.page = data.page // chnaged in pageChanged event
          draft.pagesTotal = data.total_pages
          draft.results = data.results
        }
        break
      case MovieIndexActionTypes.FETCH_ERROR:
        draft.loading = false
        draft.errors = action.payload
        break
      default:
        break
    }
  })

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as movieIndexReducer }
