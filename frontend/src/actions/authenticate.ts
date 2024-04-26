import { AUTH_TYPES, SERVER_URL } from "schema"

export const authenticate = async <T,>(data: T, type: AUTH_TYPES) => {
  const request = await fetch(`${SERVER_URL}/${type.toLowerCase()}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  const response = await request.json()
  return response

}