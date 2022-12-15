import produce from 'immer'
import {getType, ActionType} from 'typesafe-actions'
import {MovieIndexState, PageApiResponse} from './types'
import * as actions from './actions'

// Type-safe initialState!
export const initialState: MovieIndexState = {
  loading: false,
}

// I used Immer to prevent mutability without being forced to copy state object every time.
// Immer perfectly reduces amount if code in reducers, it's safe and makes code much more readable.
const reducer = (state = initialState, action: ActionType<typeof actions>): MovieIndexState =>
  produce(state, draft => {
    switch (action.type) {
      case getType(actions.searchChange):
        draft.search = action.payload
        draft.page = 1
        draft.loading = !!action.payload
        break
      case getType(actions.pageChange):
        draft.page = action.payload
        draft.loading = true
        break
      case getType(actions.fetchSearchAction.request):
        draft.loading = true
        break
      case getType(actions.fetchSearchAction.success):
        {
          draft.loading = false
          const data: PageApiResponse = action.payload
          // draft.page = data.page // chnaged in pageChanged event
          draft.pagesTotal = data.total_pages
          draft.results = data.results
        }
        break
      case getType(actions.fetchSearchAction.failure):
        draft.loading = false
        draft.errors = action.payload
        break
    }
  })

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export {reducer as movieIndexReducer}
