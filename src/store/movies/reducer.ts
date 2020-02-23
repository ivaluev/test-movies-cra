import { Reducer } from 'redux'
import { MoviesState, MoviesActionTypes } from './types'

// Type-safe initialState!
export const initialState: MoviesState = {
  data: [],
  errors: undefined,
  loading: false
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<MoviesState> = (state = initialState, action) => {
  switch (action.type) {
    case MoviesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case MoviesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case MoviesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as moviesReducer }
