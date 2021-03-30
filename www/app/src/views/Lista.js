import React, { Component } from 'react'

//Components 
import Card from '../components/Card'
import Hero from '../components/Hero'

export default class Lista extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: []
        }

        this.capitalizeFirst = this.capitalizeFirst.bind(this)
    }

    componentDidMount() {
        fetch('http://0.0.0.0:8001/api/v1/branches', {
            headers: new Headers({
                "Authorization": "Token " + process.env.REACT_APP_TOKEN
            })
        })
        .then(results => {
            return results.json()
        }).then(data => {
            let cards = data.results.map((info) => {
                return(
                    <Card 
                        name={ this.capitalizeFirst(info.name) }
                        param={ info.name }
                        url={ info.commit.url }
                    />
                )
            })

            this.setState({cards: cards})
        })
    }

    capitalizeFirst(v) {
        return v.charAt(0).toUpperCase() + v.slice(1)
    }

    render() {
        return(
            <div className="container">
                <Hero title="Github Api"/>
                <div className="columns is-multiline" style={{ margin:'auto' }}>
                    { this.state.cards }
                </div>
            </div>
        )
    }
}