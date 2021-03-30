import React from 'react'

const Bar = props => (
    <div style={{ margin:'auto', padding:'0' }}>
        <span className="title-bar">
            <b>{ props.title }: </b>
        </span>

        &nbsp;
        { props.width }
    </div>
)

const setWeight = (w)  => {
    w = w > 100 ? '100%' : w + '%'
    return w
}

export default Bar