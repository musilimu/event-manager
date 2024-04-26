import { PropsWithChildren } from "react"
import { Header } from "./Header"

export const Layout = (props: PropsWithChildren) => {
    return (<>
        <Header />
        {props.children}
    </>)
}
