import React from 'react'
import { Link } from 'react-router-dom'

const Hero = props => (
    <section className="hero is-light" style={{ margin:'0 0 1.3rem 0'}}>
        <div className="hero-body">
            <div className="container">
                <h1 className="title">
                    { props.title }
                </h1>
                <h2 className="subtitle">
                    Consulta la información de tus branches github
                </h2>
                { props.redirect == 'true' && (
                    <Link to='/lista'><a className="back-link info-padding" href="javascript:void(0)">Ir a la lista...</a></Link>
                )}
            </div>
        </div>
    </section>
)

export default Hero