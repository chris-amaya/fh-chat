const baseURL = process.env.REACT_APP_API_URL

// TODO: wrap this functions into one or in a class
export async function fetchWithoutToken(
  endpoint: string,
  data?: any,
  method = 'GET',
) {
  const url = `${baseURL}/${endpoint}`

  if (method === 'GET') {
    const resp = await fetch(url)

    return await resp.json()
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await resp.json()
  }
}

export async function fetchWithToken(
  endpoint: string,
  data?: any,
  method = 'GET',
) {
  const url = `${baseURL}/${endpoint}`

  if (method === 'GET') {
    const resp = await fetch(url, {
      headers: {
        'x-token': localStorage.getItem('token') || '',
      },
    })

    return await resp.json()
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': localStorage.getItem('token') || '',
      },
      body: JSON.stringify(data),
    })
    return await resp.json()
  }
}
