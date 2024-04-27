import { ROLES } from "schema"
import { CheckAuth } from "./RequireAuth"
import { Button } from "./forms/Button"
import { useMutation } from "react-query"
import { queryClient } from "../main"
import { deleteEvent } from "../actions/deleteEvent"
import { EventForm } from "./forms/EventForm"
import { Event as TEvent } from "../hooks/getEvents"
import { TMutateEvent } from "../actions/createEvent"
import { useState } from "react"

export const EventControls = ({ event }: { event: TEvent }) => {
    const [ showEventForm, setShowEventForm] = useState(false)
    const mutation = useMutation(deleteEvent, {
        onSuccess: () => {
            queryClient.invalidateQueries('events')
        },
    })

    return (
        <CheckAuth role={[ROLES.ADMIN]}>
            <Button onClick={() => {
                mutation.mutateAsync(event.id)
            }}>Delete Event</Button>
            <Button onClick={()=> setShowEventForm(!showEventForm)}>Edit Event</Button>
            {showEventForm && <EventForm type={TMutateEvent.UPDATE_EVENT} event={event} actionText="Update" title="Update event" />}
        </CheckAuth>
    )
}
