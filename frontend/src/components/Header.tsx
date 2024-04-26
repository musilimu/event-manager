import { useContext } from "react"
import { Link } from "react-router-dom"
import { TICKET_ACTIONS, ticketContext } from "../context/tickets"
import { Button } from "./forms/Button"
import { bookEventTickets } from "../actions/bookEventTickets"
import { useBookings } from "../hooks/getBookings"

export const Header = () => {
    const context = useContext(ticketContext)
    const data = useBookings()
    if (context === null) return
    const [state, dispatch] = context

    return (
        <header className="bg-slate-400 p-3 ">
            <nav className="max-w-screen-xl mx-auto flex justify-between items-center"><Link to='/' className="font-extrabold">Events</Link>
                <ul className="flex space-x-3 items-center">
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/bookings'}>Booked {data?.data?.data?.length} tickets</Link></li>
                    {state.tickets.length > 0 && <li className="transition cursor-pointer relative"><Button onClick={() => bookEventTickets(state.tickets).then(() => {
                        dispatch({
                            type: TICKET_ACTIONS.CLEAR_TICKETS,
                            payload: state.tickets[0]
                        })
                    })}>confirm booking {state.tickets.length} tickets</Button></li>}
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/profile'}>Profile</Link></li>
                </ul>
            </nav>
        </header>
    )
}
