import { SERVER_URL } from "schema";
import { useToken } from "../hooks/getToken";

export async function deleteEvent(id: number) {
	const token = useToken();
	if (token == null) throw new Error("unauthorized");

	const request = await fetch(`${SERVER_URL}/event/${id}`, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			authorization: `Bearer ${token}`,
		},
	});
	const response = await request.json();
	return response;
}
