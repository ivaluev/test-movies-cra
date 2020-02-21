// export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.opendota.com'

const API_ENDPOINT_URL_BASE_MOVIES = 'https://api.themoviedb.org'
const API_KEY = '03b8572954325680265531140190fd2a'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, url: string, path: string, data?: any) {
  const res = await fetch(`${API_ENDPOINT_URL_BASE_MOVIES}/api/${path}?api_key=${API_KEY}`, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}
