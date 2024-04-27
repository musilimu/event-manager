import { Event } from "../hooks/getEvents";
import { SERVER_URL } from "schema"
import { useToken } from "../hooks/getToken";

const initialTicketIds: number[] = []

export async function bookEventTickets(tickets: Event[]) {
    const token = useToken()
    if (token == null)
        throw new Error("unauthorized")

    const ticketIds = tickets.reduce((payload, ticket) => [...payload, ticket.id], initialTicketIds)
    const request = await fetch(`${SERVER_URL}/booking`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ticketIds)
    })
    const response = await request.json()
    return response

}
