import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="bg-slate-400 p-3 ">
            <nav className="max-w-screen-xl mx-auto flex justify-between"><a href="" className=" font-extrabold">Events</a>
                <ul className="flex space-x-3">
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/dashboard'}></Link></li>
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/stats'}>Sats</Link></li>
                    <li className="hover:bg-white transition px-2 py-1 cursor-pointer"><Link to={'/profile'}>Profile</Link></li>
                </ul>
            </nav>
        </header>
    )
}
