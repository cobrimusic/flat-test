import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//Components 
import Hero from '../components/Hero'
import Info from '../layouts/Info'

export default class Detalles extends Component {
    constructor(props) {
        super(props)
        const match = props.match.params

        this.state = {
            info: null,
            name_to_url_parse: match.branch
        }

        this.capitalizeFirst = this.capitalizeFirst.bind(this)
    }

    componentDidMount() {
        const url = 'http://0.0.0.0:8001/api/v1/branch/' + this.state.name_to_url_parse
       
        fetch(url, {
            headers: new Headers({
                "Authorization": "Token " + process.env.REACT_APP_TOKEN
            })
        })
        .then(results => {
            return results.json()
        })
        .then(data => {
            let info = <Info name={ data.results.branch.name } data={ data.results } event={ this.activeTab } />
            this.setState({info: info})
        })
    }

    capitalizeFirst(v) {
        return v.charAt(0).toUpperCase() + v.slice(1)
    }

    render() {
        return(
            <div className="container">
                <Hero title={ this.state.name_to_url_parse } />
                
                <div className="columns" style={{ margin:'auto' }}>
                   { this.state.info }
                </div>

                <Link to='/lista'><a className="back-link info-padding" href="javascript:void(0)">Regresar...</a></Link>
            </div>
        )
    }
}