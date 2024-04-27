import { TMutateEvent } from "../../actions/createEvent"
import { Booking } from "../Booking"
import { EventList } from "../EventList"
import { EventForm } from "../forms/EventForm"

export const Dashboard = () => {

  return (
    <>
      <EventForm type={TMutateEvent.CREATE_EVENT} />
      <div className="gap-4 grid">
      <div className="bg-slate-200 p-4">
        <EventList />
      </div>
      <div>
        <Booking />
      </div>
      </div>
    </>
  )
}


