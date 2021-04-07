import React, { Component } from 'react'

//Components 
import Card from '../components/Card'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import ModalForm from '../components/ModalForm'

export default class ListaPulls extends Component {
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

            fetch('http://0.0.0.0:8001/api/v1/pulls', {
                headers: new Headers({
                    "Authorization": "Token " + process.env.REACT_APP_TOKEN
                })
            })
            .then(results => {
                return results.json()
            }).then(result => {
                let cards = result.results.map((info) => {
                    return(
                        <Card 
                            key={ info.title }
                            name={ this.capitalizeFirst(info.title) }
                            param={ null }
                            url={ '' }
                            button={ true }
                            data={ info } 
                            updateStatus={ this.updateStatus }
                            tag={ true }
                        />
                    )
                })

                this.setState({cards: cards})
            })
        })
    }

    updateStatus(info, status) {
        let data = {
            ...info, 
            status: status
        }

        fetch('http://0.0.0.0:8001/api/v1/pulls/update/', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers({
                "Authorization": "Token " + process.env.REACT_APP_TOKEN
            })
        })
        .then(results => {
            return results.json()
        }).then(result => {
            alert('Estatus cambiado', JSON.stringify(result))
            window.location.reload()
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
                <Hero title="Github Api | Pulls"/>

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