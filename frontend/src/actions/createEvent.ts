import { SERVER_URL } from "schema";
import type { Event } from "../hooks/getEvents";
import { useToken } from "../hooks/getToken";

export enum TMutateEvent {
	UPDATE_EVENT = "PUT",
	CREATE_EVENT = "POST",
}

export const mutateEvent = async ({
	data,
	type,
	event,
}: { data: any; event?: Event; type: TMutateEvent }) => {
	const token = useToken();
	if (token == null) throw new Error("unauthorized");

	const request = await fetch(
		`${SERVER_URL}/event/${event?.id ? event?.id : ""}`,
		{
			method: type,
			headers: {
				"content-type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		},
	);
	const response = await request.json();
	return response;
};
