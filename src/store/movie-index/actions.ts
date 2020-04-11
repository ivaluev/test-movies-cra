import { action, createAsyncAction } from 'typesafe-actions'
import { MovieIndexActionTypes, PageApiResponse } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const searchChange = (search: string) => action(MovieIndexActionTypes.SEARCH_CHANGED, search)
export const pageChange = (index: number) => action(MovieIndexActionTypes.PAGE_CHANGED, index)

const fetchSeachAction = createAsyncAction(
  '@@movies/FETCH_REQUEST',
  '@@movies/FETCH_SUCCESS',
  '@@movies/FETCH_ERROR'
)<string, PageApiResponse, string, undefined>()
