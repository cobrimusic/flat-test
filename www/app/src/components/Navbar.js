import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = props => {
    
    const handleOpenModal = () => {
        props.openModal(true)
    }

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbar" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to='/' className="navbar-item">
                            Home
                        </Link>

                        <Link to='/pulls' className="navbar-item">
                            Pulls
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary" onClick={handleOpenModal}>
                                    <strong>Crear Pull Request</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar