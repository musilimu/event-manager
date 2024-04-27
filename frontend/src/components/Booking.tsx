import { useMutation, useQuery } from "react-query";
import { deleteTicket } from "../actions/cancelTicket";
import { Event } from "./Event";
import { Button } from "./forms/Button";
import { getBookings } from "../hooks/getBookings";
import { queryClient } from "../main";

export const Booking = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: "tickets",
        queryFn: getBookings
    })

    const mutation = useMutation(deleteTicket, {
        onSuccess: () => {
            queryClient.invalidateQueries('tickets')
        },
    })

    if (error) return <>{error}</>
    if (isLoading) return <>Loading...</>

    return (
        <div className="flex gap-4 flex-wrap my-8">{
            data?.data?.data?.map(ticket => (<Event showctions={false} key={ticket.id} event={ticket.event}>
                <Button onClick={() => {
                    mutation.mutateAsync(ticket.id)
                }}>cancel</Button>
            </Event>))
        }</div>
    )
}
