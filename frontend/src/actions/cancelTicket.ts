import { SERVER_URL } from "schema"


export async function deleteTicket(ticketId: number) {
    const request = await fetch(`${SERVER_URL}/booking/${ticketId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    })
    const response = await request.json()
    return response

}
