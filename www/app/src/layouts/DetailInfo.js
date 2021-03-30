import React from 'react'

function DetailInfo(props){
    return (
        <div className="column is-12 info-padding" style={{ padding:'0'}}>
            <div className="media-content" style={{ alignSelf:'center' }}>
                <p className="title is-4">{ props.name }</p>
                <div className="columns is-multiline">
                    <div className="column is-6">
                        <span>
                            <b>Mensaje: </b>
                            <div className="columns is-multiline is-mobile">
                                { props.data.commit.message }
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DetailInfo