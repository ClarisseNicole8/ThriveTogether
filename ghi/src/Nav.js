import logo from "./images/thrivetogether.png";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { NavLink, Link } from "react-router-dom";

function Nav() {
    const { logout } = useToken();
    const { token } = useToken();

    return (
        <>
            <div className="logo-container circle bg-darkblue">
                <img src={logo} alt="Logo" className="d-inline-block align-text-top logo circle" />
            </div>
            <header className="bg-darkblue">
                <div className="nav-container">
                    <nav className="navbar nav navbar-expand-lg">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand" to="#">Thrive Together</NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                                    {!token &&
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                            </li>
                                        </>
                                    }
                                    {token &&
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={logout}>
                                            Logout
                                        </button>
                                    </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="vertical-nav bg-midblue dark-text">
                    <ul>
                        <li>
                            <Link to="/info">View Profile</Link>
                        </li>
                        <li>
                            <Link to="/inbox">Inbox</Link>
                        </li>
                        <li>
                            <Link to="/matches">Matches</Link>
                        </li>
                        <li>
                            <Link to="/peers">Peers</Link>
                        </li>
                        <li>
                            <Link to="/edit_tags">Edit Tags</Link>
                        </li>
                        <li>
                            <Link to="/peer_connections">Check peer request</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Nav;
