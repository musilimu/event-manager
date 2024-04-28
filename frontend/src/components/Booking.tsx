import { useMutation, useQuery } from "react-query";
import { ROLES } from "schema";
import { deleteTicket } from "../actions/cancelTicket";
import { getBookings } from "../hooks/getBookings";
import { queryClient } from "../main";
import { Event } from "./Event";
import { CheckAuth } from "./RequireAuth";
import { Button } from "./forms/Button";

export const Booking = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: "tickets",
		queryFn: getBookings,
	});

	const mutation = useMutation(deleteTicket, {
		onSuccess: () => {
			queryClient.invalidateQueries("tickets");
		},
	});

	if (error) return <>{error}</>;
	if (isLoading) return <>Loading...</>;

	return (
		<>
			<h2 className="text-center text-3xl text-slate-600">All Bookings</h2>
			<div className="flex gap-4 flex-wrap my-8">
				{data?.data?.data?.map((ticket) => (
					<Event showctions={false} key={ticket.id} event={ticket.event}>
						<CheckAuth role={[ROLES.ADMIN]}>
							<p>Booked by: {ticket.user.email}</p>
						</CheckAuth>
						<Button
							onClick={() => {
								mutation.mutateAsync(ticket.id);
							}}
						>
							cancel
						</Button>
					</Event>
				))}
			</div>
		</>
	);
};
