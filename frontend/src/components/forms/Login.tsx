import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_TYPES } from "schema";
import { authenticate } from "../../actions/authenticate";
import { useToken } from "../../hooks/getToken";
import { queryClient } from "../../main";
import { AuthForm } from "./AuthForm";

export const Login = () => {
	const [responseMessage, setResponseMessage] = useState("");
	const navigate = useNavigate();
	const mutation = useMutation(authenticate, {
		onSuccess: () => {
			navigate("/");
			queryClient.invalidateQueries("tickets");
		},
		onError: (error: any) => {
			setResponseMessage(error.message || error.name);
		},
	});
	const token = useToken();
	useEffect(() => {
		if (token) navigate("/");
	}, []);

	return (
		<>
			<AuthForm
				actionText="Login"
				title="Login now"
				formSubmit={(data) => {
					mutation.mutateAsync({
						data,
						type: AUTH_TYPES.LOGIN,
					});
				}}
				link={{ link: "/register", text: "Don't have an account? Signup!" }}
			/>
			<p className="text-center">{responseMessage}</p>
		</>
	);
};
