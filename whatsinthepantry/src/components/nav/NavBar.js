import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import WhatsinthepantryLogo from '../WhatsinthepantryLogo.png'

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
            <ul className="navbar">
                <Link className="logo__link navbar__link" to="/">
                    <img className="logo__img" src={WhatsinthepantryLogo} alt="Decoration Station Logo" />
                </Link>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/allingredients">All Ingredients</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/mypantry">My Pantry</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/customingredients">My Custom Ingredients</Link>
                </li>
                {
                    localStorage.getItem("pantry_user")
                        ? <li className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("pantry_user")
                                navigate("/", { replace: true })
                            }}>Logout</Link>
                        </li>
                        : ""
                }
            </ul>
        </>
    )
}

