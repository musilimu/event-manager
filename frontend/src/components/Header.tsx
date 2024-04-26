import { useContext } from "react"
import { Link } from "react-router-dom"
import { ticketContext } from "../context/tickets"
import { Button } from "./forms/Button"
import { bookEventTickets } from "../actions/bookEventTickets"

export const Header = () => {
    const context = useContext(ticketContext)
    if (context === null) return
    const [state, _] = context

    return (
        <header className="bg-slate-400 p-3 ">
            <nav className="max-w-screen-xl mx-auto flex justify-between items-center"><a href="" className=" font-extrabold">Events</a>
                <ul className="flex space-x-3 items-center">
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/dashboard'}></Link></li>
                    {state.tickets.length > 0 && <li className="transition cursor-pointer relative"><Button onClick={() => bookEventTickets(state.tickets)}>confirm booking {state.tickets.length} tickets</Button></li>}
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/profile'}>Profile</Link></li>
                </ul>
            </nav>
        </header>
    )
}
