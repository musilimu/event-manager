import { type AUTH_TYPES, SERVER_URL } from "schema";

export const authenticate = async ({
	data,
	type,
}: { data: any; type: AUTH_TYPES }) => {
	const request = await fetch(`${SERVER_URL}/${type.toLowerCase()}`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const response = await request.json();
	localStorage.setItem("jwt", response.token);
	return response;
};
