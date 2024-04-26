import { useContext, useMemo } from "react"
import { Event as TEvent } from "../hooks/getEvents"
import { Button } from "./forms/Button"
import { TICKET_ACTIONS, ticketContext } from "../context/tickets"

export const Event = ({ event }: { event: TEvent }) => {
    const { createdAt, id, isTicketAvailable, location, title } = event
    const context = useContext(ticketContext)
    if (context === null) return
    const [state, dispatch] = context
    const tickets = useMemo(() => state.tickets.filter(ticket => id === ticket.id), [state.tickets])

    return (
        <div key={id} title={!isTicketAvailable ? "Ticket not available" : ""} className={`bg-slate-100 p-6 grid gap-2 hover:scale-105 transition-all ${!isTicketAvailable ? "border-slate-400 border-solid border-2" : ""}`}>
            <p>{!isTicketAvailable ? "Ticket not available" : "Ticket available now"}</p>
            <p>title: {title}</p>
            <p>location: {location}</p>
            <p>generated At: {new Date(createdAt).toLocaleString()}</p>
            <div className="flex">
                {tickets.length > 0 && <Button onClick={() => {
                    dispatch({
                        type: TICKET_ACTIONS.REMOVE_TICKET,
                        payload: event
                    })
                }} disabled={!isTicketAvailable}>-</Button>}

                <Button className="flex-1" onClick={() => {
                    dispatch({
                        type: TICKET_ACTIONS.ADD_TICKET,
                        payload: event
                    })
                }} disabled={!isTicketAvailable}>book now {tickets.length}</Button>
                {tickets.length > 0 && <Button onClick={() => {
                    dispatch({
                        type: TICKET_ACTIONS.ADD_TICKET,
                        payload: event
                    })
                }} disabled={!isTicketAvailable}>+</Button>}

            </div>
        </div>
    )
}
