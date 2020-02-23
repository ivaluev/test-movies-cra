import { action } from 'typesafe-actions'
import { MoviesActionTypes, Movie } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(MoviesActionTypes.FETCH_REQUEST)
export const fetchSuccess = (data: Movie[]) => action(MoviesActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(MoviesActionTypes.FETCH_ERROR, message)
