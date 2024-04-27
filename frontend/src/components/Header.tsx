import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TICKET_ACTIONS, ticketContext } from "../context/tickets"
import { Button } from "./forms/Button"
import { bookEventTickets } from "../actions/bookEventTickets"
import { useMutation, useQuery } from "react-query"
import { getBookings } from "../hooks/getBookings"
import { queryClient } from "../main"
import { CheckAuth } from "./RequireAuth"
import { ROLES } from "schema"
import { QUERY_KEYS } from "../vars"

export const Header = () => {
    const context = useContext(ticketContext)
    if (context === null) return
    const [state, dispatch] = context
    const { data } = useQuery({
        queryKey: "tickets",
        queryFn: getBookings
    })

    const mutation = useMutation(bookEventTickets, {
        onSuccess: () => {
            queryClient.invalidateQueries('tickets')
        },
    })
    const navigate = useNavigate()
    const logout = useMutation(async () => {

    }, {
        onSuccess: () => {
            localStorage.clear()
            navigate('/login')
            QUERY_KEYS.forEach(key => queryClient.invalidateQueries(key))
            dispatch({
                type: TICKET_ACTIONS.CLEAR_TICKETS,
                payload: state.tickets[0]
            })
        },
    })


    return (
        <CheckAuth role={[ROLES.ADMIN, ROLES.GUEST]}>
            <header className="bg-slate-400 p-3 ">
                <nav className="max-w-screen-xl mx-auto flex justify-between items-center"><Link to='/' className="font-extrabold">Events</Link>
                    <ul className="flex space-x-3 items-center">
                        <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/bookings'}>Booked {data?.data?.data?.length} tickets</Link></li>
                        {state.tickets.length > 0 && <li className="transition cursor-pointer relative"><Button onClick={() => {
                            mutation.mutateAsync(state.tickets).then(() => {
                                dispatch({
                                    type: TICKET_ACTIONS.CLEAR_TICKETS,
                                    payload: state.tickets[0]
                                })
                            })
                        }}>confirm booking {state.tickets.length} tickets</Button></li>}
                        <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/dashboard'}>Dashboard</Link></li>
                        <li className="hover:bg-white transition px-2 py-1 cursor-pointer" onClick={() => {
                            logout.mutateAsync()
                        }}>Logout</li>
                    </ul>
                </nav>
            </header>
        </CheckAuth>
    )
}
