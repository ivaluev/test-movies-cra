export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.themoviedb.org/3'
export const API_KEY = process.env.REACT_APP_API_KEY || '03b8572954325680265531140190fd2a'
export const API_ENDPOINT_IMAGE = 'https://image.tmdb.org/t/p'
export const IMAGE_SAMPLE = '/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, url: string, data?: any) {
  const res = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function searchMovies(search: string) {
  // 'query=Jack+Reacher'
  const seachConcatenated = search.split(' ').join('+')
  const seachQuery = `query=${seachConcatenated}` // encode?
  const searchUrl = `${API_ENDPOINT}/search/movie?${seachQuery}&api_key=${API_KEY}`

  const result = await callApi('get', searchUrl)
  return result
}

export async function getMovieDetail(id: number) {
  throw new Error('Функционал находится в разработке.')
  // https://api.themoviedb.org/3/movie/343611?api_key={api_key}
}
