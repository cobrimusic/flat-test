import React, { Component } from 'react'

//Components 
import Card from '../components/Card'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ModalForm from '../components/ModalForm'

export default class Lista extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cards: [],
            showModal: false,
            branches: []
        }

        this.capitalizeFirst = this.capitalizeFirst.bind(this)
        this.actionModal = this.actionModal.bind(this)
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

            this.setState({
                branches: data.results
            })

            let cards = data.results.map((info) => {
                return(
                    <Card 
                        key={ info.name }
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

    actionModal(show) {
        this.setState({
            showModal: show
        })
    }

    render() {
        return(
            <div className="container">

                <Navbar openModal={this.actionModal} />
                <Hero title="Github Api"/>

                <div className="columns is-multiline" style={{ margin:'auto' }}>
                    { this.state.cards }
                </div>

                <ModalForm 
                    open={ this.state.showModal } 
                    closeModal={ this.actionModal } 
                    data={ this.state.branches }
                />
            </div>

            
        )
    }
}