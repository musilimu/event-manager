import { SERVER_URL, Event as event } from "schema"
import z from "zod"

export type Event = (z.infer<typeof event> & {
    id: number;
    isTicketAvailable: boolean
    createdAt: string
})
export async function getEvents() {
    try {
        const request = await fetch(`${SERVER_URL}/event`)
        const response = await request.json() as Event[]
        return { data: response }
    } catch (error) {
        return { error }
    }

}
