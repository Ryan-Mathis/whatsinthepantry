import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import WhatsinthepantryLogo from '../WhatsinthepantryLogo.png'

export const NavBar = () => {
    const navigate = useNavigate()

    const handleLogout = (evt) => {
        evt.preventDefault()
        
        localStorage.removeItem("pantry_user")
        navigate("/login", { replace: true })
    }

    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="logo__link navbar__link" to="/">
                        <img className="logo__img" src={WhatsinthepantryLogo} alt="What'sInThePantry Logo" />
                    </Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/allingredients">All Ingredients</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">My Pantry</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/mycustomingredients">My Custom Ingredients</Link>
                </li>
                {
                    localStorage.getItem("pantry_user")
                        ? <li className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={handleLogout}>Logout</Link>
                        </li>
                        : ""
                }
            </ul>
        </>
    )
}

