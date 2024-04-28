import { useState } from "react";
import { useMutation } from "react-query";
import { ROLES } from "schema";
import { TMutateEvent } from "../actions/createEvent";
import { deleteEvent } from "../actions/deleteEvent";
import type { Event as TEvent } from "../hooks/getEvents";
import { queryClient } from "../main";
import { CheckAuth } from "./RequireAuth";
import { Button } from "./forms/Button";
import { EventForm } from "./forms/EventForm";

export const EventControls = ({ event }: { event: TEvent }) => {
	const [showEventForm, setShowEventForm] = useState(false);
	const mutation = useMutation(deleteEvent, {
		onSuccess: () => {
			queryClient.invalidateQueries("events");
		},
	});

	return (
		<CheckAuth role={[ROLES.ADMIN]}>
			<Button
				onClick={() => {
					mutation.mutateAsync(event.id);
				}}
			>
				Delete Event
			</Button>
			<Button onClick={() => setShowEventForm(!showEventForm)}>
				Edit Event
			</Button>
			{showEventForm && (
				<EventForm
					type={TMutateEvent.UPDATE_EVENT}
					event={event}
					actionText="Update"
					title="Update event"
				/>
			)}
		</CheckAuth>
	);
};
