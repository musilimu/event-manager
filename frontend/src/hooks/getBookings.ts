import { SERVER_URL, Event as event } from "schema"
import z from "zod"
import { useToken } from "./getToken";

export type Event = (z.infer<typeof event> & {
    id: number;
    isTicketAvailable: boolean
    createdAt: string
})
export async function getBookings() {
    try {
        const token = useToken()
        if (token == null)
            throw new Error("unauthorized")

        const request = await fetch(`${SERVER_URL}/booking`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        })
        const response = await request.json()
        return { data: response }
    } catch (error) {
        return { error }
    }

}
