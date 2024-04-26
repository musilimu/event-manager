import { Event as TEvent } from "../hooks/getEvents"
import { Button } from "./forms/Button"

export const Event = ({ event: { createdAt, id, isTicketAvailable, location, title } }: { event: TEvent }) => {
    return (
        <div key={id} title={!isTicketAvailable ? "Ticket not available" : ""} className={`bg-slate-100 p-6 grid gap-2 hover:scale-105 transition-all ${!isTicketAvailable ? "border-slate-400 border-solid border-2" : ""}`}>
            <p>{!isTicketAvailable ? "Ticket not available" : "Ticket available now"}</p>
            <p>title: {title}</p>
            <p>location: {location}</p>
            <p>generated At: {new Date(createdAt).toLocaleString()}</p>
            <Button disabled={!isTicketAvailable}>book now</Button>
        </div>
    )
}
