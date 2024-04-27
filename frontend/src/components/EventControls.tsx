import { ROLES } from "schema"
import { CheckAuth } from "./RequireAuth"
import { Button } from "./forms/Button"
import { useMutation } from "react-query"
import { queryClient } from "../main"
import { deleteEvent } from "../actions/deleteEvent"

export const EventControls = ({ id }: { id: number }) => {
    const mutation = useMutation(deleteEvent, {
        onSuccess: () => {
            queryClient.invalidateQueries('events')
        },
    })
    return (
        <CheckAuth role={[ROLES.ADMIN]}>
            <Button onClick={() => {
                mutation.mutateAsync(id)
            }}>Delete Event</Button>
            <Button>Edit Event</Button>
        </CheckAuth>
    )
}
