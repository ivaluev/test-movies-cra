import { createAction } from 'typesafe-actions'
import { MovieInfo } from './types'

// export const fetchInfoRequest = createAction('@@movie/FETCH_REQUEST', action => {
//   return (id: number) => action(id)
// })
export const fetchInfoRequest = createAction('@@movie/FETCH_REQUEST')<number>()

// export const fetchInfoRequestSuccess = createAction('@@movie/FETCH_SUCCESS', action => {
//   return (data: MovieInfo) => action(data)
// })
export const fetchInfoRequestSuccess = createAction('@@movie/FETCH_SUCCESS')<MovieInfo>()

// export const fetchInfoRequestError = createAction('@@movie/FETCH_ERROR', action => {
//   return (message: string) => action(message)
// })
export const fetchInfoRequestError = createAction('@@movie/FETCH_ERROR')<string>()
