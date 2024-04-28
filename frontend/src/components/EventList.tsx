import { useQuery } from "react-query";
import { getEvents } from "../hooks/getEvents";
import { Event } from "./Event";

export const EventList = () => {
	const { data, error, isLoading } = useQuery("events", getEvents);
	if (error) return <>{error}</>;
	if (isLoading) return <>Loading...</>;

	return (
		<>
			<h2 className="text-4xl text-slate-500 text-center my-8">EventList</h2>
			<div className="flex gap-4 flex-wrap my-8 items-start">
				{data?.data?.map((event) => (
					<Event showctions key={event.id} event={event} />
				))}
			</div>
		</>
	);
};
