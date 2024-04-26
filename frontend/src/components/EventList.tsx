import { useEvents } from "../hooks/getEvents"
import { Event } from "./Event";

export const EventList = () => {
  const res = useEvents()

  if (res?.error) return <>{res.error}</>
  return (
    <>
      <h2 className="text-4xl text-slate-500 text-center my-8">EventList</h2>
      <div className="flex gap-4 flex-wrap my-8">
        {res?.data?.map(event => (
          <Event key={event.id} event={event} />
        ))}

      </div>
    </>
  )
}
