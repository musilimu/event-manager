import type { PropsWithChildren } from "react";
import { Header } from "./Header";

export const Layout = (props: PropsWithChildren) => {
	return (
		<>
			<Header />
			<main className="max-w-screen-xl mx-auto">{props.children}</main>
		</>
	);
};
