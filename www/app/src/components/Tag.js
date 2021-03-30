import React from 'react'
import DataColors from '../data/Colors'

export default class Tag extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            move: this.props.move,
            color: 'info',
            colors: DataColors
        }

        this.capitalizeFirst = this.capitalizeFirst.bind(this)
        this.replaceChar = this.replaceChar.bind(this)
        this.assingColor = this.assingColor.bind(this)
    }

    componentDidMount() {
        const move = this.capitalizeFirst(this.replaceChar(this.state.move))
        const color = this.assingColor()
        this.setState({move: move})
        this.setState({color: color})
    }

    capitalizeFirst(v) {
        return v.charAt(0).toUpperCase() + v.slice(1)
    }

    replaceChar(v) {
        return v.replace(/-/g, ' ')
    }

    assingColor() {
        const colors = this.state.colors
        return colors[Math.floor(Math.random() * colors.length)]
    }

    render() {
        return(
           <span className={'tag is-' + this.state.color + ' is-normal' }>{ this.state.move }</span> 
        )
    }
}



