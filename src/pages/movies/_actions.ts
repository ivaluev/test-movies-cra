import { callApi, API_ENDPOINT } from '../../utils/api'
import { Movie } from './_types'

export async function getMovies(): Promise<Movie[]> {
  const res = await callApi('get', API_ENDPOINT, '/heroStats')
  return res
}
