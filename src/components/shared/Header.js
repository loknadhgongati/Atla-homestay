/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const Header = ({ username, isAuth, logout }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>Atla's Homes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex">
                        <input className="form-control me-2 bwm-seach" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-bemmain btn-outline-success" type="submit">Search</button>
                    </form>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isAuth &&
                            <li className="nav-item">
                                <div
                                    className="nav-link">Welcome {username}
                                </div>
                            </li>
                        }
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/">Home

                            </Link>
                        </li>
                        {isAuth &&
                            <>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Manage
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link
                                            className="dropdown-item"
                                            to="/rentals/new">New Rental</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div
                                        onClick={logout}
                                        className="nav-link">Logout
                                    </div>
                                </li>
                            </>
                        }
                        {!isAuth &&
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/register">Register</Link>
                                </li>
                            </>
                        }

                    </ul>


                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = ({ auth: { username, isAuth } }) => {
    return {
        username,
        isAuth
    }
}

export default connect(mapStateToProps)(Header);