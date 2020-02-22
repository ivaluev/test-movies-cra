// export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'https://api.themoviedb.org'
export const API_ENDPOINT = 'https://api.opendota.com'

// https://docs.opendota.com
// const API_ENDPOINT_URL_BASE_MOVIES = 'https://api.themoviedb.org'
// const API_KEY = '03b8572954325680265531140190fd2a'
// ?api_key=${API_KEY}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi(method: string, url: string, path: string, data?: any) {
  const res = await fetch(`${url}/api${path}`, {
    method,
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function callApi2(path: string, data?: any) {
  const res = await fetch(`${API_ENDPOINT}/api/${path}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}
