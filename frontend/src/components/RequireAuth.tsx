import { type PropsWithChildren, useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import type { ROLES } from "schema";
import { getRole } from "../hooks/getRole";
import { useToken } from "../hooks/getToken";
export const RequireAuth = ({
	children,
	role,
}: { role: ROLES[] } & PropsWithChildren) => {
	const token = useToken();

	const { data, error, isLoading } = useQuery({
		queryKey: "role",
		queryFn: getRole,
	});

	const navigate = useNavigate();
	useEffect(() => {
		if (error || !token || !data) return navigate("/login");

		if (!role.includes(data?.data.name)) {
			return navigate("/");
		}
		if (error?.message === "unauthorized") return navigate("/login");
	}, [data?.data?.name, error, data]);

	if (isLoading) return undefined;

	return <>{children}</>;
};

export const CheckAuth = ({
	children,
	role,
}: { role: ROLES[] } & PropsWithChildren) => {
	const { data, error, isLoading } = useQuery({
		queryKey: "role",
		queryFn: getRole,
	});
	const navigate = useNavigate();
	const token = useToken();

	useEffect(() => {
		if (error || !token || !data) return navigate("/login");
	}, [error, data]);
	if (isLoading) return undefined;
	if (!role.includes(data?.data.name)) {
		return undefined;
	}
	return <>{children}</>;
};
