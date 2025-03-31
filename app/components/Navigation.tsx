import { Link } from "react-router";

export default function Navigation() {
    return (
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/about/team">Team</Link>
                </li>
            </ul>
        </nav>
    );
}