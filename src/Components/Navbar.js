import { NavLink } from "react-router-dom"

export default function Navbar() {
    const navClass = 'flex gap-4 justify-between items-center px-12 py-4 text-xl bg-red-500';
    const baseClass = 'text-green-600';
    const activeClass = 'text-red-600';
    return (
        <nav  className={navClass}>
            <div>
                Discover
            </div>
            
            <ul className="flex gap-4">
                <li>
                <NavLink to='/' end 
                className={({isActive})=> `${baseClass} ${isActive? activeClass: ''}`}
                >Home</NavLink>
            </li>
            <li>
                <NavLink to='/menu' end 
                className={({isActive})=> `${baseClass} ${isActive? activeClass: ''}`}
                >Menu</NavLink>
            </li>

            <li>
                <NavLink to='/order' end
                className={({isActive})=> `${baseClass} ${isActive? activeClass: ''}`}
                >Order</NavLink>
            </li>
            </ul>

            <div>
                <button>Get Ready</button>
            </div>
        </nav>
    )
};
