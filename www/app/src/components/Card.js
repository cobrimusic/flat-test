import React from 'react'

const Card = props => (
    <div className="column is-4">
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="">
                        <p className="title is-4">{ props.name }</p>
                    </div>
                </div>

                <div className="content">
                    Ver más acerca de <a href={'branch/' + props.param}>@{ props.name }</a>.
                    <br />
                </div>
            </div>
        </div>
    </div>
)

export default Card;

