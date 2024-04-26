import { deleteTicket } from "../actions/cancelTicket";
import { useBookings } from "../hooks/getBookings"
import { Event } from "./Event";
import { Button } from "./forms/Button";

export const Booking = () => {
    const {res, refetch} = useBookings()

    return (
        <div className="flex gap-4 flex-wrap my-8">{
            res?.data?.data?.map(ticket => (<Event showctions={false} key={ticket.id} event={ticket.event}>
                <Button onClick={() =>{
                    deleteTicket(ticket.id)
                    refetch()
                }}>cancel</Button>
            </Event>))
        }</div>
    )
}
