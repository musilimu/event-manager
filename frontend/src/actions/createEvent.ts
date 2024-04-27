import { SERVER_URL } from "schema"
import { useToken } from "../hooks/getToken"
export const createEvent = async(data: any) => {
    const token = useToken()
    if (token == null)
        throw new Error("unauthorized")

    const request = await fetch(`${SERVER_URL}/event`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    const response = await request.json()
    return response
}
