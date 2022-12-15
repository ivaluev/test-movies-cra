import {createAction, createAsyncAction} from 'typesafe-actions'
import {PageApiResponse} from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions

// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const searchChange = createAction('@@movies/SEARCH_CHANGED')<string>()
export const pageChange = createAction('@@movies/PAGE_CHANGED')<number>()
export const fetchSearchAction = createAsyncAction(
  '@@movies/FETCH_REQUEST',
  '@@movies/FETCH_SUCCESS',
  '@@movies/FETCH_ERROR'
)<string, PageApiResponse, string, undefined>()
