import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AUTH_TYPES } from "schema";
import { authenticate } from "../../actions/authenticate";
import { AuthForm } from "./AuthForm";

export const Register = () => {
	const [responseMessage, setResponseMessage] = useState("");
	const navigate = useNavigate();
	const mutation = useMutation(authenticate, {
		onSuccess: () => {
			navigate("/login");
		},
		onError: (error: any) => {
			setResponseMessage(error.message || error.name);
		},
	});
	return (
		<>
			<AuthForm
				actionText="sign up"
				title="Register"
				formSubmit={(data) => {
					mutation.mutateAsync({
						data,
						type: AUTH_TYPES.REGISTER,
					});
				}}
				link={{ link: "/login", text: "Have an account? Login!" }}
			/>
			<p className="text-center">{responseMessage}</p>
		</>
	);
};
