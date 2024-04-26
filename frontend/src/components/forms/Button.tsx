import { PropsWithChildren } from 'react'

export const Button = ({ children, disabled }: { disabled?: boolean } & PropsWithChildren) => {
    return (
        <button disabled={disabled} className="p-2 bg-slate-200 hover:bg-slate-300 transition disabled:cursor-not-allowed">{children}</button>
    )
}
