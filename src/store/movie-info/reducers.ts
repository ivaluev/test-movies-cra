import produce from 'immer'
import {ActionType, getType} from 'typesafe-actions'
import * as actions from './actions'
import {MovieInfoState} from './types'

export const initialState: MovieInfoState = {
  data: undefined,
  errors: undefined,
  loading: false,
}

export function movieInfoReducer(
  state = initialState,
  action: ActionType<typeof actions>
): MovieInfoState {
  return produce(state, draft => {
    switch (action.type) {
      case getType(actions.fetchInfoRequest): {
        draft.loading = true
        break
      }
      case getType(actions.fetchInfoRequestSuccess): {
        draft.loading = false
        draft.data = action.payload
        break
      }
      case getType(actions.fetchInfoRequestError): {
        draft.loading = false
        draft.errors = action.payload
      }
    }
  })
}
