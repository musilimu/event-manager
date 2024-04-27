import { TMutateEvent } from "../../actions/createEvent"
import { EventList } from "../EventList"
import { EventForm } from "../forms/EventForm"

export const Dashboard = () => {

  return (
    <>
      <EventForm type={TMutateEvent.CREATE_EVENT} />
      <EventList />
    </>
  )
}


